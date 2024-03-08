package com.azwalt.ecommerce.cart;

import org.springframework.stereotype.Service;

import com.azwalt.ecommerce.product.Product;
import com.azwalt.ecommerce.product.ProductService;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

	private final CartRepository cartRepository;
	private final CartItemService cartItemService;
	private final ProductService productService;
	private final UserService userService;

	@Override
	public Cart createCart(User user) {
		Cart cart = new Cart();
		cart.setUser(user);
		return cartRepository.save(cart);
	}

	@Override
	public Cart addCartItem(Long userId, AddItemRequest addItemRequest) throws Exception {
		Cart cart = cartRepository.findByUserId(userId);
		if (cart == null) {
			cart = createCart(userService.findUserById(userId));
		}
		Product product = productService.findProductById(addItemRequest.getProductId());
		CartItem existingCartItem = cartItemService.isCartItemExists(cart, product, userId);
		if (existingCartItem == null) {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setQuantity(1);
			cartItem.setUserId(userId);
			cartItem.setCart(cart);
			int price = product.getPrice();
			int discountedPrice = product.getDiscountedPrice();
			cartItem.setPrice(price);
			cartItem.setDiscountedPrice(discountedPrice);
			cart.getCartItems().add(cartItem);
		} else {
			int additionalPrice = product.getDiscountedPrice();
			existingCartItem.setQuantity(existingCartItem.getQuantity() + 1);
			existingCartItem.setPrice(existingCartItem.getPrice() + additionalPrice);
			cartItemService.updateCartItem(userId, existingCartItem.getId(), existingCartItem);

		}
		return cartRepository.save(cart);
	}

	@Override
	public Cart findUserCart(Long userId) throws Exception {
		Cart cart = cartRepository.findByUserId(userId);
		if (cart == null) {
			cart = createCart(userService.findUserById(userId));
			return cart;
		}
		int totalPrice = 0;
		int totalDiscountedPrice = 0;
		int totalItems = 0;
		for (CartItem cartItem : cart.getCartItems()) {
			totalPrice = totalPrice + cartItem.getPrice();
			totalDiscountedPrice = totalDiscountedPrice + cartItem.getDiscountedPrice();
			totalItems = totalItems + cartItem.getQuantity();
		}
		cart.setTotalDiscountedPrice(totalDiscountedPrice);
		cart.setTotalItems(totalItems);
		cart.setTotalPrice(totalPrice);
		cart.setDiscount(totalPrice - totalDiscountedPrice);
		return cartRepository.save(cart);
	}

	@Override
	public void emptyCart(User user) {
		Cart cart = cartRepository.findByUserId(user.getId());
		if (cart != null) {
			cart.getCartItems().clear();
			cartRepository.delete(cart);
		}
		Cart newCart = new Cart();
		newCart.setUser(user);
		cartRepository.save(newCart);
	}

}
