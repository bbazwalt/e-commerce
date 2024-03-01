package com.azwalt.ecommerce.cart;

import com.azwalt.ecommerce.product.Product;

public interface CartItemService {

	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception;

	public CartItem isCartItemExists(Cart cart, Product product, Long userId);

	public void deleteCartItem(Long userId, Long cartItemId) throws Exception;

	public CartItem findCartItemById(Long cartItemId) throws Exception;

}
