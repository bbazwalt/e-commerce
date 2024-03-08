package com.azwalt.ecommerce.order;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiConstants;
import com.azwalt.ecommerce.shared.ApiResponse;
import com.azwalt.ecommerce.user.UserUtil;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstants.BASE_API_PATH + "/admin/orders")
public class AdminOrderController {

	private final OrderService orderService;
	private final UserUtil userUtil;

	@GetMapping
	public Set<Order> findAllOrders() throws Exception {
		userUtil.checkIsAdmin();
		return orderService.findAllOrders();
	}

	@PutMapping("/{id}/pending")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Order pendingOrder(@PathVariable @NotNull Long id) throws Exception {
		userUtil.checkIsAdmin();
		return orderService.updateOrderStatus(id, OrderStatus.PENDING);
	}

	@PutMapping("/{id}/place")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Order placeOrder(@PathVariable @NotNull Long id) throws Exception {
		userUtil.checkIsAdmin();
		return orderService.updateOrderStatus(id, OrderStatus.PLACED);
	}

	@PutMapping("/{id}/confirm")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Order confirmOrder(@PathVariable @NotNull Long id) throws Exception {
		userUtil.checkIsAdmin();
		return orderService.updateOrderStatus(id, OrderStatus.CONFIRMED);
	}

	@PutMapping("/{id}/cancel")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Order cancelOrder(@PathVariable @NotNull Long id) throws Exception {
		userUtil.checkIsAdmin();
		return orderService.updateOrderStatus(id, OrderStatus.CANCELLED);
	}

	@PutMapping("/{id}/ship")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Order shipOrder(@PathVariable @NotNull Long id) throws Exception {
		userUtil.checkIsAdmin();
		return orderService.updateOrderStatus(id, OrderStatus.SHIPPED);
	}

	@PutMapping("/{id}/deliver")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Order deliverOrder(@PathVariable @NotNull Long id) throws Exception {
		userUtil.checkIsAdmin();
		return orderService.updateOrderStatus(id, OrderStatus.DELIVERED);
	}

	@DeleteMapping("/{id}")
	public ApiResponse deleteOrder(@PathVariable @NotNull Long id) throws Exception {
		userUtil.checkIsAdmin();
		orderService.deleteOrder(id);
		return new ApiResponse("Order deleted successfully.", true);
	}

}
