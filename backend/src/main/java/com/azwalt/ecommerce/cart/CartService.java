package com.azwalt.ecommerce.cart;

import com.azwalt.ecommerce.user.User;

public interface CartService {

	public Cart createCart(User user);

	public Cart addCartItem(Long userId, AddItemRequest request)
			throws Exception;

	public Cart findUserCart(Long userId) throws Exception;

	public void emptyCart(User user);

}
