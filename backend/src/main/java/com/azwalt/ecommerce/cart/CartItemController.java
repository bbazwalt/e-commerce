package com.azwalt.ecommerce.cart;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiResponse;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserException;
import com.azwalt.ecommerce.user.UserService;

import jakarta.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("api/v1/cart-items")
public class CartItemController {

	private CartItemService cartItemService;
	private UserService userService;

	public CartItemController(CartItemService cartItemService, UserService userService) {
		super();
		this.cartItemService = cartItemService;
		this.userService = userService;
	}

	@PutMapping("/{cartItemId}")
	public ResponseEntity<?> updateCartItem(@PathVariable @NotNull Long cartItemId,
			@RequestHeader("Authorization") @NotNull String token, @RequestBody @NotNull CartItem cartItem) {

		try {
			User user = userService.findUserByToken(token);
			CartItem updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
			return new ResponseEntity<CartItem>(updatedCartItem, HttpStatus.OK);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException | IllegalArgumentException | CartItemException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occured while updating the cart item.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{cartItemId}")
	public ResponseEntity<?> deleteCartItem(@PathVariable @NotNull Long cartItemId,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			cartItemService.deleteCartItem(user.getId(), cartItemId);
			return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException | IllegalArgumentException | CartItemException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<ApiResponse>(
					new ApiResponse("An error occurred while deleting the cart item.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
