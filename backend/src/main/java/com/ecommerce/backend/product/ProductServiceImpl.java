package com.ecommerce.backend.product;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.lang.Collections;

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
	public Product createProduct(CreateProductRequest request) {
		Category topLevel = categoryRepository.findByName(request.getTopLevelCategory());
		if (topLevel == null) {
			Category topLevelCategory = new Category();
			topLevelCategory.setName(request.getTopLevelCategory());
			topLevelCategory.setLevel(1);

			topLevel = categoryRepository.save(topLevelCategory);
		}
		Category secondLevel = categoryRepository.findByNameAndParent(request.getSecondLevelCategory(),
				topLevel.getName());
		if (secondLevel == null) {
			Category secondLevelCategory = new Category();
			secondLevelCategory.setName(request.getSecondLevelCategory());
			secondLevelCategory.setParentCategory(topLevel);
			secondLevelCategory.setLevel(2);

			secondLevel = categoryRepository.save(secondLevelCategory);
		}
		Category thirdLevel = categoryRepository.findByNameAndParent(request.getThirdLevelCategory(),
				secondLevel.getName());
		if (thirdLevel == null) {
			Category thirdLevelCategory = new Category();
			thirdLevelCategory.setName(request.getThirdLevelCategory());
			thirdLevelCategory.setParentCategory(secondLevel);
			thirdLevelCategory.setLevel(3);

			topLevel = categoryRepository.save(thirdLevelCategory);
		}

		Product product = new Product();
		product.setTitle(request.getTitle());
		product.setColor(request.getColor());
		product.setDescription(request.getDescription());
		product.setDiscountedPrice(request.getDiscountedPrice());
		product.setDiscountPercent(request.getDiscountPercent());
		product.setImageUrl(request.getImageUrl());
		product.setBrand(request.getBrand());
		product.setPrice(request.getPrice());
		product.setStorage(request.getStorage());
		product.setMemory(request.getMemory());
		product.setQuantity(request.getQuantity());
		product.setCategory(thirdLevel);
		product.setCreatedAt(Instant.now());

		Product savedProduct = productRepository.save(product);

		return savedProduct;
	}

	@Override
	public String deleteProduct(Long id) throws ProductException {
		Product product = findProductById(id);
		productRepository.delete(product);
		return "Product deleted successfully";
	}

	@Override
	public Product updateProduct(Long id, Product modifiedProduct) throws ProductException {
		Product product = findProductById(id);
		if (modifiedProduct.getQuantity() != 0) {
			product.setQuantity(modifiedProduct.getQuantity());
		}
		return productRepository.save(product);
	}

	@Override
	public Product findProductById(Long id) throws ProductException {
		Optional<Product> opt = productRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new ProductException("No product found with the id - " + id);
	}

	@Override
	public List<Product> findProductsByCategory(String category) {
		List<Product> products = productRepository.findProductsByCategory(category);
		return products;

	}

	@Override
	public Page<Product> getAllProducts(String category, List<String> colors, List<String> storages,
			List<String> memories, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock,
			Integer pageNumber, Integer pageSize) {

		List<Product> products = productRepository.filterProducts(category, minPrice, maxPrice, minDiscount, sort);

		if (!memories.isEmpty()) {
			products = products.stream().filter(p -> memories.stream().anyMatch(c -> c.equalsIgnoreCase(p.getMemory())))
					.collect(Collectors.toList());
		}

		if (!storages.isEmpty()) {
			products = products.stream()
					.filter(p -> storages.stream().anyMatch(c -> c.equalsIgnoreCase(p.getStorage())))
					.collect(Collectors.toList());
		}

		if (!colors.isEmpty()) {
			products = products.stream().filter(p -> colors.stream().anyMatch(c -> c.equalsIgnoreCase(p.getColor())))
					.collect(Collectors.toList());
		}

		if (stock != null) {
			if (stock.equals("in_stock")) {
				products = products.stream().filter(p -> p.getQuantity() > 0).collect(Collectors.toList());
			} else if (stock.equals("out_of_stock")) {
				products = products.stream().filter(p -> p.getQuantity() < 1).collect(Collectors.toList());
			}
		}
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
	public List<Product> findAllProducts() {
		return productRepository.findAll();
	}

}
