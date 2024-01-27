package com.ecommerce.backend.cart;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ecommerce.backend.product.Product;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserException;
import com.ecommerce.backend.user.UserService;

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
	public CartItem createCardItem(CartItem cartItem) {
		cartItem.setQuantity(1);
		cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
		cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice() * cartItem.getQuantity());

		CartItem createdCartItem = cartItemRepository.save(cartItem);

		return createdCartItem;
	}

	@Override
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
		CartItem item = findCartItemById(id);
		User user = userService.findUserById(item.getUserId());
		if (user.getId().equals(userId)) {
			item.setQuantity(cartItem.getQuantity());
			if (item.getProduct() != null) {
				item.setPrice(item.getQuantity() * item.getProduct().getPrice());
				item.setDiscountedPrice(item.getProduct().getDiscountedPrice() * item.getQuantity());
			} else {
				throw new CartItemException("Product cannot be null for cart item with ID: " + id);
			}

		}
		return cartItemRepository.save(item);
	}

	@Override
	public CartItem isCartItemExists(Cart cart, Product product, Long userId) {
		CartItem cartItem = cartItemRepository.isCartItemExists(cart, product, userId);
		return cartItem;
	}

	@Override
	public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
		CartItem cartItem = findCartItemById(cartItemId);
		User user = userService.findUserById(cartItem.getUserId());
		User reqUser = userService.findUserById(userId);
		if (user.getId().equals(reqUser.getId())) {
			cartItemRepository.deleteById(cartItemId);
		} else {
			throw new UserException("You can not remove another user item");
		}

	}

	@Override
	public CartItem findCartItemById(Long cartItemId) throws CartItemException {

		Optional<CartItem> opt = cartItemRepository.findById(cartItemId);

		if (opt.isPresent()) {
			return opt.get();
		}
		throw new CartItemException("No CartItem found with id - " + cartItemId);

	}

}
