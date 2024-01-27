package com.ecommerce.backend.order;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserException;
import com.ecommerce.backend.user.UserService;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

	private OrderService orderService;
	private UserService userService;

	public OrderController(OrderService orderService, UserService userService) {
		super();
		this.orderService = orderService;
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity<Order> createOrder(@RequestBody Address address, @RequestHeader("Authorization") String jwt)
			throws UserException {
		User user = userService.findUserProfileByJwt(jwt);
		Order order = orderService.createOrder(user, address);

		return new ResponseEntity<Order>(order, HttpStatus.CREATED);
	}

	@GetMapping("/user")
	public ResponseEntity<List<Order>> usersOrderHistory(@RequestHeader("Authorization") String jwt)
			throws UserException {
		User user = userService.findUserProfileByJwt(jwt);
		List<Order> orders = orderService.usersOrderHistory(user.getId());
		return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Order> findOrderById(@PathVariable("id") Long id, @RequestHeader("Authorization") String jwt)
			throws UserException, OrderException {
		Order order = orderService.findOrderById(id);
		return new ResponseEntity<Order>(order, HttpStatus.OK);
	}
}
