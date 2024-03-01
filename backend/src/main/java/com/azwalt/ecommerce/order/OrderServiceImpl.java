package com.azwalt.ecommerce.order;

import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.azwalt.ecommerce.cart.Cart;
import com.azwalt.ecommerce.cart.CartItem;
import com.azwalt.ecommerce.cart.CartService;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserRepository;

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
	public Order createOrder(User user, Address address) throws Exception {
		if (user == null) {
			throw new IllegalArgumentException("User must not be null.");
		}

		if (address == null) {
			throw new IllegalArgumentException("Address must not be null.");
		}

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
		createdOrder.setOrderDate(Instant.now());
		createdOrder.setOrderStatus("PENDING");
		Order savedOrder = orderRepository.save(createdOrder);
		for (OrderItem orderItem : orderItems) {
			orderItem.setOrder(savedOrder);
			orderItemRepository.save(orderItem);
		}
		return savedOrder;
	}

	@Override
	public Order findOrderById(Long id, Long userId) throws OrderException {
		if (id == null) {
			throw new IllegalArgumentException("Order ID must not be null.");
		}
		if (userId == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		Optional<Order> opt = orderRepository.findById(id);
		if (opt.isPresent()) {
			Order order = opt.get();
			if (order.getUser().getId().equals(userId)) {
				return order;
			}
			throw new OrderException("You are not associated with this order.");
		}
		throw new OrderException("No order found with the given ID.");
	}

	@Override
	public Order findOrderById(Long id) throws OrderException {
		if (id == null) {
			throw new IllegalArgumentException("Order ID must not be null.");
		}
		Optional<Order> opt = orderRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new OrderException("No order found with the given ID.");
	}

	@Override
	public Set<Order> findUserOrdersByStatus(Long userId, Set<String> statuses) {
		if (userId == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		if (statuses == null || statuses.isEmpty()) {
			return orderRepository.findUserOrdersByUserId(userId);
		} else {
			return orderRepository.findUserOrdersByStatus(userId, statuses);
		}
	}

	@Override
	public Order pendingOrder(Long id) throws OrderException {
		if (id == null) {
			throw new IllegalArgumentException("Order ID must not be null.");
		}
		Order order = findOrderById(id);
		order.setOrderStatus("PENDING");
		order.setDeliveryDate(null);
		return orderRepository.save(order);
	}

	@Override
	public Order placeOrder(Long id) throws OrderException {
		if (id == null) {
			throw new IllegalArgumentException("Order ID must not be null.");
		}
		Order order = findOrderById(id);
		order.setOrderStatus("PLACED");
		order.setDeliveryDate(null);
		return orderRepository.save(order);
	}

	@Override
	public Order confirmOrder(Long id) throws OrderException {
		if (id == null) {
			throw new IllegalArgumentException("Order ID must not be null.");
		}
		Order order = findOrderById(id);
		order.setOrderStatus("CONFIRMED");
		order.setDeliveryDate(null);
		return orderRepository.save(order);
	}

	@Override
	public Order cancelOrder(Long id) throws OrderException {
		if (id == null) {
			throw new IllegalArgumentException("Order ID must not be null.");
		}
		Order order = findOrderById(id);
		order.setOrderStatus("CANCELLED");
		order.setDeliveryDate(null);
		return orderRepository.save(order);
	}

	@Override
	public Order shipOrder(Long id) throws OrderException {
		if (id == null) {
			throw new IllegalArgumentException("Order ID must not be null.");
		}
		Order order = findOrderById(id);
		order.setOrderStatus("SHIPPED");
		order.setDeliveryDate(null);
		return orderRepository.save(order);
	}

	@Override
	public Order delieverOrder(Long id) throws OrderException {
		if (id == null) {
			throw new IllegalArgumentException("Order ID must not be null.");
		}
		Order order = findOrderById(id);
		order.setOrderStatus("DELIVERED");
		order.setDeliveryDate(Instant.now());
		return orderRepository.save(order);
	}

	@Override
	public Set<Order> findAllOrders() {
		return new LinkedHashSet<>(orderRepository.findAll());
	}

	@Override
	public void deleteOrder(Long id) throws OrderException {
		if (id == null) {
			throw new IllegalArgumentException("Order ID must not be null.");
		}
		Order order = findOrderById(id);
		order.getOrderItems().clear();
		orderRepository.save(order);
		orderRepository.delete(order);

	}

}
