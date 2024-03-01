package com.azwalt.ecommerce.product;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

	private ProductRepository productRepository;
	private CategoryRepository categoryRepository;

	public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
		super();
		this.productRepository = productRepository;
		this.categoryRepository = categoryRepository;
	}

	@Override
	public Product createProduct(CreateProductRequest createProductRequest) {

		if (createProductRequest == null) {
			throw new IllegalArgumentException("Create Product Request must not be null.");
		}

		Category topLevel = categoryRepository.findByName(createProductRequest.getTopLevelCategory());
		if (topLevel == null) {
			Category topLevelCategory = new Category();
			topLevelCategory.setName(createProductRequest.getTopLevelCategory());
			topLevelCategory.setLevel(1);
			topLevel = categoryRepository.save(topLevelCategory);
		}
		Category secondLevel = categoryRepository.findByNameAndParent(createProductRequest.getSecondLevelCategory(),
				topLevel.getName());
		if (secondLevel == null) {
			Category secondLevelCategory = new Category();
			secondLevelCategory.setName(createProductRequest.getSecondLevelCategory());
			secondLevelCategory.setParentCategory(topLevel);
			secondLevelCategory.setLevel(2);
			secondLevel = categoryRepository.save(secondLevelCategory);
		}
		Category thirdLevel = categoryRepository.findByNameAndParent(createProductRequest.getThirdLevelCategory(),
				secondLevel.getName());
		if (thirdLevel == null) {
			Category thirdLevelCategory = new Category();
			thirdLevelCategory.setName(createProductRequest.getThirdLevelCategory());
			thirdLevelCategory.setParentCategory(secondLevel);
			thirdLevelCategory.setLevel(3);
			topLevel = categoryRepository.save(thirdLevelCategory);
		}

		Product product = new Product();
		product.setTitle(createProductRequest.getTitle());
		product.setColor(createProductRequest.getColor());
		product.setDescription(createProductRequest.getDescription());
		product.setDiscountedPrice(createProductRequest.getDiscountedPrice());
		product.setDiscountPercent(createProductRequest.getDiscountPercent());
		product.setImage(createProductRequest.getImage());
		product.setBrand(createProductRequest.getBrand());
		product.setPrice(createProductRequest.getPrice());
		product.setStorage(createProductRequest.getStorage());
		product.setMemory(createProductRequest.getMemory());
		product.setQuantity(createProductRequest.getQuantity());
		product.setCategory(thirdLevel);
		product.setCreatedAt(Instant.now());
		return productRepository.save(product);
	}

	@Override
	public void deleteProduct(Long id) throws Exception {
		if (id == null) {
			throw new IllegalArgumentException("Product ID must not be null.");
		}
		Product product = findProductById(id);
		productRepository.delete(product);
	}

	@Override
	public Product findProductById(Long id) throws Exception {
		if (id == null) {
			throw new IllegalArgumentException("Product ID must not be null.");
		}
		Optional<Product> opt = productRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new ProductException("No product found with the given ID.");
	}

	@Override
	public Set<Product> findProductsByCategoryName(String categoryName) {
		if (categoryName == null) {
			throw new IllegalArgumentException("Category name must not be null.");
		}
		Set<Product> products = productRepository.findByCategoryName(categoryName);
		return products;
	}

	@Override
	public Page<Product> findProductsByFilters(String category, Set<String> colors, Set<String> storages,
			Set<String> memories, int minPrice, int maxPrice, int minDiscount, String sort, String stock,
			int pageNumber, int pageSize) {

		if (colors.isEmpty()) {
			colors = null;
		}

		if (storages.isEmpty()) {
			storages = null;
		}

		if (memories.isEmpty()) {
			memories = null;
		}

		if (stock.isEmpty()) {
			stock = null;
		}

		Set<Product> productsSet = productRepository.filterProducts(category, colors, storages, memories, minPrice,
				maxPrice, minDiscount, stock, sort);

		List<Product> products = new ArrayList<>(productsSet);

		int totalFilteredProducts = products.size();
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);

		int startIndex = (int) pageable.getOffset();
		int endIndex = Math.min(startIndex + pageSize, totalFilteredProducts);

		if (totalFilteredProducts == 0 || startIndex >= totalFilteredProducts) {
			return new PageImpl<>(Collections.emptyList(), pageable, totalFilteredProducts);
		}

		List<Product> pageContent = products.subList(startIndex, endIndex);

		Page<Product> filterProducts = new PageImpl<>(pageContent, pageable, totalFilteredProducts);
		return filterProducts;

	}

	@Override
	public Set<Product> findAllProducts() {
		return new LinkedHashSet<>(productRepository.findAll());
	}

}
