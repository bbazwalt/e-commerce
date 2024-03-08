package com.azwalt.ecommerce.order;

import java.util.Set;

import com.azwalt.ecommerce.user.User;

public interface OrderService {

	public Order createOrder(User user, Address address) throws Exception;

	public Order findOrderById(Long id) throws Exception;

	public Order findOrderById(Long id, Long userId) throws Exception;

	public Set<Order> findAllOrders();

	public Set<Order> findUserOrdersByStatus(Long userId, Set<String> statuses);

	public Order updateOrderStatus(Long id, OrderStatus status) throws Exception;

	public void deleteOrder(Long id) throws Exception;

}
