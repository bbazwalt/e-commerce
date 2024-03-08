package com.azwalt.ecommerce.product;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiConstants;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstants.BASE_API_PATH + "/products")
public class ProductController {

	private final ProductService productService;

	@GetMapping("/{id}")
	public Product findProductById(@PathVariable @NotNull Long id) throws Exception {
		return productService.findProductById(id);
	}

	@GetMapping("/category/{categoryName}")
	public Set<Product> findProductByCategoryName(@PathVariable @NotBlank String categoryName) {
		return productService.findProductsByCategoryName(categoryName);
	}

	@GetMapping
	public Page<Product> findProductByFilters(@RequestParam(required = false) String category,
			@RequestParam(required = false) Set<String> colors, @RequestParam(required = false) Set<String> storages,
			@RequestParam(required = false) Set<String> memories,
			@RequestParam(required = false) int minPrice, @RequestParam(required = false) int maxPrice,
			@RequestParam(required = false) int minDiscount,
			@RequestParam(required = false) String sort, @RequestParam(required = false) String stock,
			@RequestParam(required = false) int pageNumber,
			@RequestParam(required = false) int pageSize) {
		return productService.findProductsByFilters(category, colors, storages, memories, minPrice,
				maxPrice,
				minDiscount, sort, stock, pageNumber, pageSize);
	}

}
