package com.ecommerce.backend.order;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.shared.ApiResponse;

@RestController
@RequestMapping("api/v1/admin/orders")
public class AdminOrderController {

	private OrderService orderService;

	public AdminOrderController(OrderService orderService) {
		super();
		this.orderService = orderService;
	}

	@GetMapping
	public ResponseEntity<List<Order>> getAllOrdersHandler() {
		List<Order> orders = orderService.getAllOrders();
		return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
	}

	@PutMapping("/{id}/confirm")
	public ResponseEntity<Order> confirmOrderHandler(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
			throws OrderException {
		Order order = orderService.confirmOrder(id);
		return new ResponseEntity<Order>(order, HttpStatus.ACCEPTED);
	}

	@PutMapping("/{id}/ship")
	public ResponseEntity<Order> shipOrderHandler(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
			throws OrderException {
		Order order = orderService.shipOrder(id);
		return new ResponseEntity<Order>(order, HttpStatus.ACCEPTED);
	}

	@PutMapping("/{id}/deliver")
	public ResponseEntity<Order> deliverOrderHandler(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
			throws OrderException {
		Order order = orderService.delieverOrder(id);
		return new ResponseEntity<Order>(order, HttpStatus.ACCEPTED);
	}

	@PutMapping("/{id}/cancel")
	public ResponseEntity<Order> cancelOrderHandler(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
			throws OrderException {
		Order order = orderService.cancelOrder(id);
		return new ResponseEntity<Order>(order, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/{id}/delete")
	public ResponseEntity<ApiResponse> deleteOrderHandler(@PathVariable Long id,
			@RequestHeader("Authorization") String jwt) throws OrderException {
		orderService.deleteOrder(id);

		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("Order deleted successfully");
		apiResponse.setStatus(true);

		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.ACCEPTED);
	}

}
