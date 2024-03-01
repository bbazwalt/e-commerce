package com.azwalt.ecommerce.order;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiResponse;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserService;

import jakarta.validation.constraints.NotNull;

@Validated
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
	public ResponseEntity<?> createOrder(@RequestBody @NotNull Address address,
			@RequestHeader("Authorization") @NotNull String token) {

		try {
			User user = userService.findUserByToken(token);
			Order order = orderService.createOrder(user, address);
			return new ResponseEntity<Order>(order, HttpStatus.CREATED);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | OrderException exception) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while creating the order.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping
	public ResponseEntity<?> findUserOrdersByStatus(
			@RequestHeader("Authorization") @NotNull String token,
			@RequestParam(required = false) @NotNull Set<String> statuses) {

		try {
			User user = userService.findUserByToken(token);
			Set<Order> orders = orderService.findUserOrdersByStatus(user.getId(), statuses);
			return new ResponseEntity<>(orders, HttpStatus.OK);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | OrderException exception) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while finding the orders.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findOrderById(@PathVariable("id") @NotNull Long id,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			Order order = orderService.findOrderById(id, user.getId());
			return new ResponseEntity<Order>(order, HttpStatus.OK);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | OrderException exception) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while finding the order.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
