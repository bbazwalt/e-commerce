package com.azwalt.ecommerce.order;

import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.azwalt.ecommerce.cart.Cart;
import com.azwalt.ecommerce.cart.CartItem;
import com.azwalt.ecommerce.cart.CartService;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;
	private final CartService cartService;
	private final AddressRepository addressRepository;
	private final UserRepository userRepository;
	private final OrderItemRepository orderItemRepository;

	@Override
	public Order createOrder(User user, Address address) throws Exception {
		Address savedAddress = address;
		Set<Address> userAddresses = user.getAddresses();
		boolean addressExists = userAddresses.contains(savedAddress);
		if (!addressExists) {
			address.setUser(user);
			savedAddress = addressRepository.save(address);
			userAddresses.add(savedAddress);
			userRepository.save(user);
		}
		Cart cart = cartService.findUserCart(user.getId());
		List<OrderItem> orderItems = new ArrayList<>();
		for (CartItem cartItem : cart.getCartItems()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setPrice(cartItem.getPrice());
			orderItem.setProduct(cartItem.getProduct());
			orderItem.setQuantity(cartItem.getQuantity());
			orderItem.setUserId(cartItem.getUserId());
			orderItem.setDiscountedPrice(cartItem.getDiscountedPrice());
			OrderItem createdOrderItem = orderItemRepository.save(orderItem);
			orderItems.add(createdOrderItem);
		}
		Order createdOrder = new Order();
		createdOrder.setUser(user);
		createdOrder.setOrderItems(orderItems);
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
		createdOrder.setDiscount(cart.getDiscount());
		createdOrder.setTotalItems(cart.getTotalItems());
		createdOrder.setAddress(savedAddress);
		createdOrder.setCreatedAt(Instant.now());
		createdOrder.setOrderStatus(OrderStatus.PENDING);
		Order savedOrder = orderRepository.save(createdOrder);
		for (OrderItem orderItem : orderItems) {
			orderItem.setOrder(savedOrder);
			orderItemRepository.save(orderItem);
		}
		return savedOrder;
	}

	@Override
	public Order findOrderById(Long id) throws Exception {
		Optional<Order> opt = orderRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new Exception("No order found with the given ID.");
	}

	@Override
	public Order findOrderById(Long id, Long userId) throws Exception {
		Optional<Order> opt = orderRepository.findById(id);
		if (opt.isPresent()) {
			Order order = opt.get();
			if (order.getUser().getId().equals(userId)) {
				return order;
			}
			throw new Exception("You are not associated with this order.");
		}
		throw new Exception("No order found with the given ID.");
	}

	@Override
	public Set<Order> findAllOrders() {
		return new LinkedHashSet<>(orderRepository.findAll());
	}

	@Override
	public Set<Order> findUserOrdersByStatus(Long userId, Set<String> statuses) {
		if (statuses == null || statuses.isEmpty()) {
			return orderRepository.findUserOrders(userId);
		}
		Set<OrderStatus> enumStatuses = statuses.stream()
				.map(String::toUpperCase)
				.map(OrderStatus::valueOf)
				.collect(Collectors.toSet());
		return orderRepository.findUserOrdersByStatus(userId, enumStatuses);
	}

	@Override
	public Order updateOrderStatus(Long id, OrderStatus status) throws Exception {
		Order order = findOrderById(id);
		order.setOrderStatus(status);
		order.setDeliveryDate(status == OrderStatus.DELIVERED ? Instant.now() : null);
		return orderRepository.save(order);
	}

	@Override
	public void deleteOrder(Long id) throws Exception {
		Order order = findOrderById(id);
		order.getOrderItems().clear();
		orderRepository.save(order);
		orderRepository.delete(order);
	}

}
