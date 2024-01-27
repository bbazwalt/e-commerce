package com.ecommerce.backend.product;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

	private ProductService productService;

	public ProductController(ProductService productService) {
		super();
		this.productService = productService;
	}

	@GetMapping
	public ResponseEntity<Page<Product>> findProductByCategoryHandle(@RequestParam String category,
			@RequestParam List<String> colors, @RequestParam List<String> storages, @RequestParam List<String> memories,
			@RequestParam Integer minPrice, @RequestParam Integer maxPrice, @RequestParam Integer minDiscount,
			@RequestParam String sort, @RequestParam String stock, @RequestParam Integer pageNumber,
			@RequestParam Integer pageSize) {

		Page<Product> res = productService.getAllProducts(category, colors, storages, memories, minPrice, maxPrice,
				minDiscount, sort, stock, pageNumber, pageSize);
		return new ResponseEntity<Page<Product>>(res, HttpStatus.ACCEPTED);
	}

	@GetMapping("/id/{productId}")
	public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException {
		Product product = productService.findProductById(productId);
		return new ResponseEntity<Product>(product, HttpStatus.ACCEPTED);
	}

	@GetMapping("/category/{categoryName}")
	public ResponseEntity<List<Product>> findProductByCategoryHandler(@PathVariable String categoryName)
			throws ProductException {
		List<Product> products = productService.findProductsByCategory(categoryName);
		return new ResponseEntity<List<Product>>(products, HttpStatus.ACCEPTED);
	}


}
