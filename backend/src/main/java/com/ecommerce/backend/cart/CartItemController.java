package com.ecommerce.backend.cart;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserException;
import com.ecommerce.backend.user.UserService;

@RestController
@RequestMapping("api/v1/cart_items")
public class CartItemController {

	CartItemService cartItemService;
	UserService userService;

	public CartItemController(CartItemService cartItemService, UserService userService) {
		super();
		this.cartItemService = cartItemService;
		this.userService = userService;
	}

	@PutMapping("/{cartItemId}")
	public ResponseEntity<CartItem> updateCartItem(@PathVariable Long cartItemId,
			@RequestHeader("Authorization") String jwt, @RequestBody CartItem cartItem)
			throws UserException, CartItemException {
		User user = userService.findUserProfileByJwt(jwt);
		CartItem updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
		return new ResponseEntity<CartItem>(updatedCartItem, HttpStatus.OK);
	}

	@DeleteMapping("/{cartItemId}")
	public ResponseEntity<Long> deleteCartItem(@PathVariable Long cartItemId,
			@RequestHeader("Authorization") String jwt) throws UserException, CartItemException {
		User user = userService.findUserProfileByJwt(jwt);
		cartItemService.removeCartItem(user.getId(), cartItemId);
		return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
	}

}
