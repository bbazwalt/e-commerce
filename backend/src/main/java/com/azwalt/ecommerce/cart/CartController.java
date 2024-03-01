package com.azwalt.ecommerce.cart;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.product.ProductException;
import com.azwalt.ecommerce.shared.ApiResponse;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserException;
import com.azwalt.ecommerce.user.UserService;

import jakarta.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

	private CartService cartService;
	private UserService userService;

	public CartController(CartService cartService, UserService userService) {
		super();
		this.cartService = cartService;
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity<?> addItemToCart(@RequestBody @NotNull AddItemRequest addItemRequest,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			Cart cart = cartService.addCartItem(user.getId(), addItemRequest);
			return new ResponseEntity<>(cart, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);

		} catch (IllegalArgumentException | ProductException | UserException | CartItemException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while adding the item to the cart.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping
	public ResponseEntity<?> findUserCart(@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			Cart cart = cartService.findUserCart(user.getId());
			return new ResponseEntity<>(cart, HttpStatus.OK);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | UserException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while finding the user cart.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
