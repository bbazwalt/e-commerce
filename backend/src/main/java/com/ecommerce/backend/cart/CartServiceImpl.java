package com.ecommerce.backend.cart;

import org.springframework.stereotype.Service;

import com.ecommerce.backend.product.Product;
import com.ecommerce.backend.product.ProductException;
import com.ecommerce.backend.product.ProductService;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserException;
import com.ecommerce.backend.user.UserService;

@Service
public class CartServiceImpl implements CartService {

	private CartRepository cartRepository;
	private CartItemService cartItemService;
	private ProductService productService;
	private UserService userService;

	public CartServiceImpl(CartRepository cartRepository, CartItemService cartItemService,
			ProductService productService, UserService userService) {
		super();
		this.cartRepository = cartRepository;
		this.cartItemService = cartItemService;
		this.productService = productService;
		this.userService = userService;
	}

	@Override
	public Cart createCart(User user) {
		Cart cart = new Cart();
		cart.setUser(user);
		return cartRepository.save(cart);
	}

	@Override
	public Cart addCartItem(Long userId, AddItemRequest request) throws ProductException, UserException {
		Cart cart = cartRepository.findByUserId(userId);
		if (cart == null) {
			cart = createCart(userService.findUserById(userId));
		}
		Product product = productService.findProductById(request.getProductId());


		CartItem existingCartItem = cartItemService.isCartItemExists(cart, product, userId);


		if (existingCartItem == null) {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setQuantity(request.getQuantity());
			cartItem.setUserId(userId);
			cartItem.setCart(cart);
			int price = request.getQuantity() * product.getPrice();
			int discountedPrice = request.getQuantity() * product.getDiscountedPrice();
			cartItem.setPrice(price);
			cartItem.setDiscountedPrice(discountedPrice);
			cart.getCartItems().add(cartItem);
		} else {
			int additionalPrice = request.getQuantity() * product.getDiscountedPrice();
			existingCartItem.setQuantity(existingCartItem.getQuantity() + request.getQuantity());
			existingCartItem.setPrice(existingCartItem.getPrice() + additionalPrice);
			try {
				cartItemService.updateCartItem(userId, existingCartItem.getId(), existingCartItem);
			} catch (CartItemException | UserException e) {
				e.printStackTrace();
			}
		}
		return cartRepository.save(cart);
	}

	@Override
	public Cart findUserCart(Long userId) {
		Cart cart = cartRepository.findByUserId(userId);
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

}
