package com.azwalt.ecommerce.cart;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiConstants;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserUtil;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstants.BASE_API_PATH + "/cart")
@Validated
public class CartController {

	private final CartService cartService;
	private final UserUtil userUtil;

	@PostMapping
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Cart addItemToCart(@RequestBody @NotNull AddItemRequest addItemRequest) throws Exception {
		User user = userUtil.getCurrentUser();
		return cartService.addCartItem(user.getId(), addItemRequest);
	}

	@GetMapping
	public Cart findUserCart() throws Exception {
		User user = userUtil.getCurrentUser();
		return cartService.findUserCart(user.getId());
	}

}
