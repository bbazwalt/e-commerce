package com.azwalt.ecommerce.order;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiConstants;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserUtil;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstants.BASE_API_PATH + "/orders")
@Validated
public class OrderController {

	private final OrderService orderService;
	private final UserUtil userUtil;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Order createOrder(@RequestBody @NotNull @Valid Address address) throws Exception {
		User user = userUtil.getCurrentUser();
		return orderService.createOrder(user, address);
	}

	@GetMapping("/{id}")
	public Order findOrderById(@PathVariable("id") @NotNull Long id) throws Exception {
		User user = userUtil.getCurrentUser();
		return orderService.findOrderById(id, user.getId());
	}

	@GetMapping
	public Set<Order> findUserOrdersByStatus(
			@RequestParam(required = false) Set<String> statuses) throws Exception {
		User user = userUtil.getCurrentUser();
		return orderService.findUserOrdersByStatus(user.getId(), statuses);
	}

}
