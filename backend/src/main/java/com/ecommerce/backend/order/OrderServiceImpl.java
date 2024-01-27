package com.ecommerce.backend.order;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ecommerce.backend.cart.Cart;
import com.ecommerce.backend.cart.CartItem;
import com.ecommerce.backend.cart.CartService;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {

	private OrderRepository orderRepository;
	private CartService cartService;
	private AddressRepository addressRepository;
	private UserRepository userRepository;
	private OrderItemRepository orderItemRepository;

	public OrderServiceImpl(OrderRepository orderRepository, CartService cartService,
			AddressRepository addressRepository, UserRepository userRepository,
			OrderItemRepository orderItemRepository) {
		super();
		this.orderRepository = orderRepository;
		this.cartService = cartService;
		this.addressRepository = addressRepository;
		this.userRepository = userRepository;
		this.orderItemRepository = orderItemRepository;
	}

	@Override
	public Order createOrder(User user, Address address) {

		Address savedAddress = address;

		List<Address> userAddresses = user.getAddresses();
		boolean addressExists = userAddresses.stream().anyMatch(existingAddress -> existingAddress.equals(address));

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

		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setOrderStatus("PENDING");
		createdOrder.getPaymentDetails().setStatus("PENDING");
		createdOrder.setCreatedAt(LocalDateTime.now());

		Order savedOrder = orderRepository.save(createdOrder);

		for (OrderItem orderItem : orderItems) {
			orderItem.setOrder(savedOrder);
			orderItemRepository.save(orderItem);
		}

		return savedOrder;
	}

	@Override
	public Order findOrderById(Long id) throws OrderException {
		Optional<Order> opt = orderRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new OrderException("No order found with the id - " + id);
	}

	@Override
	public List<Order> usersOrderHistory(Long id) {
		List<Order> orders = orderRepository.getUserOrders(id);
		return orders;
	}

	@Override
	public Order placeOrder(Long id) throws OrderException {
		Order order = findOrderById(id);
		order.setOrderStatus("PLACED");
		order.getPaymentDetails().setStatus("COMPLETED");
		return orderRepository.save(order);
	}

	@Override
	public Order confirmOrder(Long id) throws OrderException {
		Order order = findOrderById(id);
		order.setOrderStatus("CONFIRMED");
		return orderRepository.save(order);
	}

	@Override
	public Order shipOrder(Long id) throws OrderException {
		Order order = findOrderById(id);
		order.setOrderStatus("SHIPPED");
		return orderRepository.save(order);
	}

	@Override
	public Order delieverOrder(Long id) throws OrderException {
		Order order = findOrderById(id);
		order.setOrderStatus("DELIVERED");
		return orderRepository.save(order);
	}

	@Override
	public Order cancelOrder(Long id) throws OrderException {
		Order order = findOrderById(id);
		order.setOrderStatus("CANCELLED");
		return orderRepository.save(order);
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	@Override
	public void deleteOrder(Long id) throws OrderException {
		orderRepository.deleteById(id);

	}

}
