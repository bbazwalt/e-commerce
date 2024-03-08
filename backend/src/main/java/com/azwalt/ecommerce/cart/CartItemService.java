package com.azwalt.ecommerce.cart;

import com.azwalt.ecommerce.product.Product;

public interface CartItemService {

	public CartItem findCartItemById(Long id) throws Exception;

	public CartItem isCartItemExists(Cart cart, Product product, Long userId);

	public CartItem updateCartItem(Long userId, Long cartItemId, CartItem cartItem) throws Exception;

	public void deleteCartItem(Long userId, Long cartItemId) throws Exception;

}
