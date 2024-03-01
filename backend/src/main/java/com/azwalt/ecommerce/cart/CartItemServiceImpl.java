package com.azwalt.ecommerce.cart;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.azwalt.ecommerce.product.Product;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserService;

@Service
public class CartItemServiceImpl implements CartItemService {

	private CartItemRepository cartItemRepository;
	private UserService userService;

	public CartItemServiceImpl(CartItemRepository cartItemRepository, UserService userService) {
		super();
		this.cartItemRepository = cartItemRepository;
		this.userService = userService;
	}

	@Override
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception {
		if (cartItem == null) {
			throw new IllegalArgumentException("Cart item must not be null.");
		}
		if (userId == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		if (id == null) {
			throw new IllegalArgumentException("Cart item ID must not be null.");
		}
		CartItem item = findCartItemById(id);
		User user = userService.findUserById(item.getUserId());
		if (user.getId().equals(userId)) {
			item.setQuantity(cartItem.getQuantity());
			if (item.getProduct() != null) {
				item.setPrice(item.getQuantity() * item.getProduct().getPrice());
				item.setDiscountedPrice(item.getProduct().getDiscountedPrice() * item.getQuantity());
				return cartItemRepository.save(item);

			} else {
				throw new CartItemException("Product must not be null for cart item with given ID.");
			}
		}
		throw new CartItemException("User with given ID is not authorized to update cart item.");
	}

	@Override
	public CartItem isCartItemExists(Cart cart, Product product, Long userId) {
		if (cart == null) {
			throw new IllegalArgumentException("Cart must not be null.");
		}
		if (product == null) {
			throw new IllegalArgumentException("Product must not be null.");
		}
		if (userId == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		CartItem cartItem = cartItemRepository.isCartItemExists(cart, product, userId);
		return cartItem;
	}

	@Override
	public void deleteCartItem(Long userId, Long cartItemId) throws Exception {
		if (userId == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		if (cartItemId == null) {
			throw new IllegalArgumentException("Cart item ID must not be null.");
		}
		CartItem cartItem = findCartItemById(cartItemId);
		User user = userService.findUserById(cartItem.getUserId());
		User reqUser = userService.findUserById(userId);
		if (user.getId().equals(reqUser.getId())) {
			cartItemRepository.deleteById(cartItemId);
		} else {
			throw new CartItemException("User with given ID is not authorized to delete the cart item.");
		}

	}

	@Override
	public CartItem findCartItemById(Long cartItemId) throws CartItemException {
		if (cartItemId == null) {
			throw new IllegalArgumentException("Cart item ID must not be null.");
		}

		Optional<CartItem> opt = cartItemRepository.findById(cartItemId);

		if (opt.isPresent()) {
			return opt.get();
		}
		throw new CartItemException("No cart item found with the given ID.");

	}

}
