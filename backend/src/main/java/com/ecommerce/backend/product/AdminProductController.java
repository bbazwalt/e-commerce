package com.ecommerce.backend.product;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.shared.ApiResponse;

@RestController
@RequestMapping("/api/v1/admin/products")
public class AdminProductController {

	private ProductService productService;

	public AdminProductController(ProductService productService) {
		super();
		this.productService = productService;
	}

	@PostMapping
	public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest request) {
		Product product = productService.createProduct(request);
		return new ResponseEntity<Product>(product, HttpStatus.CREATED);
	}

	@DeleteMapping("/{productId}/delete")
	public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long productId) throws ProductException {
		productService.deleteProduct(productId);
		ApiResponse res = new ApiResponse();
		res.setMessage("Product deleted successfully");
		res.setStatus(true);
		return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
	}

	@GetMapping("/all")
	public ResponseEntity<List<Product>> findAllProducts() throws ProductException {
		List<Product> products = productService.findAllProducts();
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}

	@PutMapping("/{productId}/update")
	public ResponseEntity<Product> updateProduct(@RequestBody Product req, @PathVariable Long productId)
			throws ProductException {
		Product product = productService.updateProduct(productId, req);
		return new ResponseEntity<Product>(product, HttpStatus.OK);
	}

	@PostMapping("/create")
	public ResponseEntity<ApiResponse> createMultipleProduct(@RequestBody CreateProductRequest[] request)
			throws ProductException {
		for (CreateProductRequest productRequest : request) {
			productService.createProduct(productRequest);
		}
		ApiResponse res = new ApiResponse();
		res.setMessage("Products created successfully");
		res.setStatus(true);
		return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
	}

}
