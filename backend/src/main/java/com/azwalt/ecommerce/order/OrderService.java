package com.azwalt.ecommerce.order;

import java.util.Set;

import com.azwalt.ecommerce.user.User;

public interface OrderService {

	public Order createOrder(User user, Address address) throws Exception;

	public Order findOrderById(Long id, Long userId) throws Exception;

	public Order findOrderById(Long id) throws Exception;

	public Order pendingOrder(Long id) throws Exception;

	public Order placeOrder(Long id) throws Exception;

	public Order confirmOrder(Long id) throws Exception;

	public Order cancelOrder(Long id) throws Exception;

	public Order shipOrder(Long id) throws Exception;

	public Order delieverOrder(Long id) throws Exception;

	public Set<Order> findAllOrders();

	public Set<Order> findUserOrdersByStatus(Long userId, Set<String> statuses);

	public void deleteOrder(Long id) throws Exception;

}
