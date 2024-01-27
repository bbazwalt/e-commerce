package com.ecommerce.backend.cart;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.product.Product;
import com.ecommerce.backend.product.ProductException;
import com.ecommerce.backend.product.ProductService;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserException;
import com.ecommerce.backend.user.UserService;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

	CartService cartService;
	UserService userService;
	ProductService productService;
	CartRepository cartRepository;

	public CartController(CartService cartService, UserService userService, ProductService productService,
			CartRepository cartRepository) {
		super();
		this.cartService = cartService;
		this.userService = userService;
		this.productService = productService;
		this.cartRepository = cartRepository;
	}

	@PutMapping("/add")
	public ResponseEntity<Cart> addItemtoCart(@RequestBody AddItemRequest request,
			@RequestHeader("Authorization") String jwt) throws ProductException, UserException, CartItemException {
		User user = userService.findUserProfileByJwt(jwt);
		Product product = productService.findProductById(request.getProductId());
		AddItemRequest addItemRequest = new AddItemRequest();
		addItemRequest.setProductId(request.getProductId());
		addItemRequest.setMemory(product.getMemory());
		addItemRequest.setQuantity(1);
		addItemRequest.setPrice(product.getDiscountedPrice());
		addItemRequest.setStorage(product.getStorage());
		Cart cart = cartService.addCartItem(user.getId(), addItemRequest);
		return new ResponseEntity<Cart>(cart, HttpStatus.ACCEPTED);

	}

	@GetMapping
	public ResponseEntity<Cart> getUserCart(@RequestHeader("Authorization") String jwt)
			throws ProductException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		Cart cart = cartService.findUserCart(user.getId());
		return new ResponseEntity<Cart>(cart, HttpStatus.ACCEPTED);

	}

}
