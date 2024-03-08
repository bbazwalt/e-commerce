package com.azwalt.ecommerce.product;

import java.util.Set;

import org.springframework.data.domain.Page;

public interface ProductService {

	public Product createProduct(CreateProductRequest createProductRequest);

	public Product findProductById(Long id) throws Exception;

	public Set<Product> findAllProducts();

	public Set<Product> findProductsByCategoryName(String categoryName);

	public Page<Product> findProductsByFilters(String catergory, Set<String> colors, Set<String> storages,
			Set<String> memories, int minPrice,
			int maxPrice, int minDiscount, String sort, String stock, int pageNumber, int pageSize);

	public void deleteProduct(Long id) throws Exception;

}
