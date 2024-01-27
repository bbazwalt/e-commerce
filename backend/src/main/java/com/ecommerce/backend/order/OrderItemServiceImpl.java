package com.ecommerce.backend.order;

import org.springframework.stereotype.Service;

@Service
public class OrderItemServiceImpl implements OrderItemService {

	
	private OrderItemRepository orderItemRepository;
	
	
	
	public OrderItemServiceImpl(OrderItemRepository orderItemRepository) {
		super();
		this.orderItemRepository = orderItemRepository;
	}

	@Override
	public OrderItem createOrderItem(OrderItem orderItem) {
		return orderItemRepository.save(orderItem);
	}

}
