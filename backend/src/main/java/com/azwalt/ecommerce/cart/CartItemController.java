package com.azwalt.ecommerce.cart;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiConstants;
import com.azwalt.ecommerce.shared.ApiResponse;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserUtil;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstants.BASE_API_PATH + "/cart-items")
@Validated
public class CartItemController {

	private final CartItemService cartItemService;
	private final UserUtil userUtil;

	@PutMapping("/{cartItemId}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public CartItem updateCartItem(@PathVariable @NotNull Long cartItemId,
			@RequestBody @NotNull @Valid CartItem cartItem) throws Exception {
		User user = userUtil.getCurrentUser();
		return cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
	}

	@DeleteMapping("/{cartItemId}")
	public ApiResponse deleteCartItem(@PathVariable @NotNull Long cartItemId) throws Exception {
		User user = userUtil.getCurrentUser();
		cartItemService.deleteCartItem(user.getId(), cartItemId);
		return new ApiResponse("Cart item deleted successfully.", true);
	}

}
