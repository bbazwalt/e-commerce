package com.ecommerce.backend.order;

import java.util.List;

import com.ecommerce.backend.user.User;

public interface OrderService {

	public Order createOrder(User user, Address address);
	
	public Order findOrderById(Long id) throws OrderException;
	
	public List<Order> usersOrderHistory(Long id);
	
	public Order placeOrder(Long id) throws OrderException;
	
	public Order confirmOrder(Long id) throws OrderException;
	
	public Order shipOrder(Long id) throws OrderException;
	
	public Order delieverOrder(Long id) throws OrderException;
	
	public Order cancelOrder(Long id) throws OrderException;
	
	public List<Order> getAllOrders();
	
	public void deleteOrder(Long id) throws OrderException;

}
