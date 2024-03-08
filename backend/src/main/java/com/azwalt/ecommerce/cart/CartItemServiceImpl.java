package com.azwalt.ecommerce.cart;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.azwalt.ecommerce.product.Product;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

	private final CartItemRepository cartItemRepository;
	private final UserService userService;

	@Override
	public CartItem findCartItemById(Long id) throws CartItemException {
		Optional<CartItem> opt = cartItemRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new CartItemException("No cart item found with the given ID.");
	}

	@Override
	public CartItem isCartItemExists(Cart cart, Product product, Long userId) {
		CartItem cartItem = cartItemRepository.isCartItemExists(cart, product, userId);
		return cartItem;
	}

	@Override
	public CartItem updateCartItem(Long userId, Long cartItemId, CartItem cartItem) throws Exception {
		CartItem item = findCartItemById(cartItemId);
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
	public void deleteCartItem(Long userId, Long cartItemId) throws Exception {
		CartItem cartItem = findCartItemById(cartItemId);
		User user = userService.findUserById(cartItem.getUserId());
		User reqUser = userService.findUserById(userId);
		if (user.getId().equals(reqUser.getId())) {
			cartItemRepository.deleteById(cartItemId);
		} else {
			throw new CartItemException("User with given ID is not authorized to delete the cart item.");
		}
	}

}
