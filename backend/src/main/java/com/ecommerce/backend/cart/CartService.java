package com.ecommerce.backend.cart;

import com.ecommerce.backend.product.ProductException;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserException;

public interface CartService {

	public Cart createCart(User user);

	public Cart addCartItem(Long userId, AddItemRequest request)
			throws ProductException, UserException, CartItemException;

	public Cart findUserCart(Long userId);
}
