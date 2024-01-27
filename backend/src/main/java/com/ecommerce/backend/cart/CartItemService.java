package com.ecommerce.backend.cart;

import com.ecommerce.backend.product.Product;
import com.ecommerce.backend.user.UserException;

public interface CartItemService {

	public CartItem createCardItem(CartItem cartItem);

	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;

	public CartItem isCartItemExists(Cart cart, Product product, Long userId);

	public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException;

	public CartItem findCartItemById(Long cartItemId) throws CartItemException;

}
