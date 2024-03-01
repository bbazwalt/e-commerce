package com.azwalt.ecommerce.product;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("SELECT p FROM Product p WHERE (p.category.name=:category OR :category='' OR :category IS NULL) "
			+ "AND (p.discountedPrice BETWEEN :minPrice AND :maxPrice) "
			+ "AND (p.discountPercent >= :minDiscount) "
			+ "AND (:colors IS NULL OR LOWER(p.color) IN :colors ) "
			+ "AND (:storages IS NULL OR p.storage IN :storages ) "
			+ "AND (:memories IS NULL OR p.memory IN :memories ) "
			+ "AND ( (:stock IS NULL) OR (:stock = 'inStock' AND p.quantity > 0) OR (:stock = 'outOfStock' AND p.quantity = 0) ) "
			+ "ORDER BY "
			+ "CASE WHEN :sort = 'priceLow' THEN p.discountedPrice END ASC, "
			+ "CASE WHEN :sort = 'priceHigh' THEN p.discountedPrice END DESC")
	public Set<Product> filterProducts(@Param("category") String category, @Param("colors") Set<String> colors,
			@Param("storages") Set<String> storages,
			@Param("memories") Set<String> memories,
			@Param("minPrice") int minPrice,
			@Param("maxPrice") int maxPrice, @Param("minDiscount") int minDiscount, @Param("stock") String stock,
			@Param("sort") String sort);

	public Set<Product> findByCategoryName(String categoryName);

}
