package com.ecommerce.backend.product;

import java.util.List;

import org.springframework.data.domain.Page;

public interface ProductService {

	public Product createProduct(CreateProductRequest request);

	public String deleteProduct(Long id) throws ProductException;

	public Product updateProduct(Long id, Product modifiedProduct) throws ProductException;

	public Product findProductById(Long id) throws ProductException;

	public List<Product> findProductsByCategory(String category);

	public Page<Product> getAllProducts(String catergory, List<String> colors, List<String> storages, List<String> memories, Integer minPrice,
			Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize);

	public List<Product> findAllProducts();
}
