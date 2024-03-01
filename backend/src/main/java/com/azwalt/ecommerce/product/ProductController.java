package com.azwalt.ecommerce.product;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiResponse;

import jakarta.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

	private ProductService productService;

	public ProductController(ProductService productService) {
		super();
		this.productService = productService;
	}

	@GetMapping
	public ResponseEntity<?> findProductByFilters(@RequestParam(required = false) String category,
			@RequestParam(required = false) Set<String> colors, @RequestParam(required = false) Set<String> storages,
			@RequestParam(required = false) Set<String> memories,
			@RequestParam(required = false) int minPrice, @RequestParam(required = false) int maxPrice,
			@RequestParam(required = false) int minDiscount,
			@RequestParam(required = false) String sort, @RequestParam(required = false) String stock,
			@RequestParam(required = false) int pageNumber,
			@RequestParam(required = false) int pageSize) {

		try {
			Page<Product> res = productService.findProductsByFilters(category, colors, storages, memories, minPrice,
					maxPrice,
					minDiscount, sort, stock, pageNumber, pageSize);
			return new ResponseEntity<>(res, HttpStatus.OK);
		} catch (Exception exception) {
			return new ResponseEntity<>(
					new ApiResponse("An error occured while finding the products by filters.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/{productId}")
	public ResponseEntity<?> findProductById(@PathVariable @NotNull Long productId) {
		try {
			Product product = productService.findProductById(productId);
			return new ResponseEntity<>(product, HttpStatus.OK);
		} catch (IllegalArgumentException | ProductException productException) {
			return new ResponseEntity<>(new ApiResponse(productException.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occured while finding the product by ID.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/category/{categoryName}")
	public ResponseEntity<?> findProductByCategoryName(@PathVariable @NotNull String categoryName) {

		try {
			Set<Product> products = productService.findProductsByCategoryName(categoryName);
			return new ResponseEntity<Set<Product>>(products, HttpStatus.ACCEPTED);

		} catch (IllegalArgumentException productException) {
			return new ResponseEntity<>(new ApiResponse(productException.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(
					new ApiResponse("An error occured while finding the products by category name.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
