package com.azwalt.ecommerce.product;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiConstants;
import com.azwalt.ecommerce.shared.ApiResponse;
import com.azwalt.ecommerce.user.UserUtil;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstants.BASE_API_PATH + "/admin/products")
@Validated
public class AdminProductController {

	private final ProductService productService;
	private final UserUtil userUtil;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Product createProduct(
			@RequestBody @NotNull @Valid CreateProductRequest createProductRequest) throws Exception {
		userUtil.checkIsAdmin();
		return productService.createProduct(createProductRequest);
	}

	@GetMapping
	public Set<Product> findAllProducts() throws Exception {
		userUtil.checkIsAdmin();
		return productService.findAllProducts();
	}

	@DeleteMapping("/{id}")
	public ApiResponse deleteProduct(
			@PathVariable @NotNull Long id) throws Exception {
		userUtil.checkIsAdmin();
		productService.deleteProduct(id);
		return new ApiResponse("Product deleted successfully.", true);
	}

}
