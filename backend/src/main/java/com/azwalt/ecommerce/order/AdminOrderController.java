package com.azwalt.ecommerce.order;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiResponse;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserService;
import com.azwalt.ecommerce.user.UserUtil;

import jakarta.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("api/v1/admin/orders")
public class AdminOrderController {

	private OrderService orderService;

	private UserService userService;

	public AdminOrderController(OrderService orderService, UserService userService) {
		super();
		this.orderService = orderService;
		this.userService = userService;
	}

	@GetMapping
	public ResponseEntity<?> findAllOrders(@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			UserUtil.checkIsAdmin(user);
			Set<Order> orders = orderService.findAllOrders();
			return new ResponseEntity<>(orders, HttpStatus.OK);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException illegalArgumentException) {
			return new ResponseEntity<>(new ApiResponse(illegalArgumentException.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while finding all the orders.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PutMapping("/{id}/pending")
	public ResponseEntity<?> pendingOrder(@PathVariable @NotNull Long id,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			UserUtil.checkIsAdmin(user);
			Order order = orderService.pendingOrder(id);
			return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | OrderException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while pending the order.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PutMapping("/{id}/place")
	public ResponseEntity<?> placeOrder(@PathVariable @NotNull Long id,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			UserUtil.checkIsAdmin(user);
			Order order = orderService.placeOrder(id);
			return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | OrderException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while placing the order.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{id}/confirm")
	public ResponseEntity<?> confirmOrder(@PathVariable @NotNull Long id,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			UserUtil.checkIsAdmin(user);
			Order order = orderService.confirmOrder(id);
			return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | OrderException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while confirming the order.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{id}/cancel")
	public ResponseEntity<?> cancelOrder(@PathVariable @NotNull Long id,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			UserUtil.checkIsAdmin(user);
			Order order = orderService.cancelOrder(id);
			return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | OrderException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while cancelling the order.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{id}/ship")
	public ResponseEntity<?> shipOrder(@PathVariable @NotNull Long id,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			UserUtil.checkIsAdmin(user);
			Order order = orderService.shipOrder(id);
			return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | OrderException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while shipping the order.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{id}/deliver")
	public ResponseEntity<?> deliverOrder(@PathVariable @NotNull Long id,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			UserUtil.checkIsAdmin(user);
			Order order = orderService.delieverOrder(id);
			return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | OrderException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while delivering the order.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteOrder(@PathVariable @NotNull Long id,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			UserUtil.checkIsAdmin(user);
			orderService.deleteOrder(id);
			return new ResponseEntity<ApiResponse>(new ApiResponse("Order deleted successfully", true),
					HttpStatus.OK);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | OrderException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while deleting the order.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
