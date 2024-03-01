package com.azwalt.ecommerce.product;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiResponse;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserException;
import com.azwalt.ecommerce.user.UserService;
import com.azwalt.ecommerce.user.UserUtil;

import jakarta.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("/api/v1/admin/products")
public class AdminProductController {

	private ProductService productService;
	private UserService userService;

	public AdminProductController(ProductService productService, UserService userService) {
		super();
		this.productService = productService;
		this.userService = userService;
	}

	@GetMapping
	public ResponseEntity<?> findAllProducts(@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			UserUtil.checkIsAdmin(user);
			Set<Product> products = productService.findAllProducts();
			return new ResponseEntity<>(products, HttpStatus.OK);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (ProductException | IllegalArgumentException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occured while finding all products.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping
	public ResponseEntity<?> createProduct(@RequestHeader("Authorization") @NotNull String token,
			@RequestBody @NotNull CreateProductRequest createProductRequest) {

		try {
			User user = userService.findUserByToken(token);
			UserUtil.checkIsAdmin(user);
			Product product = productService.createProduct(createProductRequest);
			return new ResponseEntity<>(product, HttpStatus.CREATED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | UserException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occured while creating the product.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@DeleteMapping("/{productId}")
	public ResponseEntity<ApiResponse> deleteProduct(@RequestHeader("Authorization") @NotNull String token,
			@PathVariable @NotNull Long productId)  {

		try {
			User user = userService.findUserByToken(token);
			UserUtil.checkIsAdmin(user);
			productService.deleteProduct(productId);
			return new ResponseEntity<ApiResponse>(new ApiResponse("Product deleted successfully", true),
					HttpStatus.OK);
		} catch (IllegalArgumentException | UserException | ProductException exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occured while deleting the product.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
