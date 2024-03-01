package com.azwalt.ecommerce.cart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.azwalt.ecommerce.product.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

	@Query("SELECT ci FROM CartItem ci WHERE ci.cart=:cart AND ci.product=:product AND ci.userId=:userId")
	public CartItem isCartItemExists(@Param("cart") Cart cart, @Param("product") Product product,
			@Param("userId") Long userId);
}
