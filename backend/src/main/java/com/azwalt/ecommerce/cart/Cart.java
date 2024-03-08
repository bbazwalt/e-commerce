package com.azwalt.ecommerce.cart;

import java.util.LinkedHashSet;
import java.util.Set;

import com.azwalt.ecommerce.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@PositiveOrZero(message = "{product.constraints.quantity.PositiveOrZero.message}")
	private int totalItems;

	@PositiveOrZero(message = "{product.constraints.price.PositiveOrZero.message}")
	private int totalPrice;

	@PositiveOrZero(message = "{product.constraints.discountedPrice.PositiveOrZero.message}")
	private int totalDiscountedPrice;

	@PositiveOrZero(message = "{product.constraints.price.PositiveOrZero.message}")
	private int discount;

	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<CartItem> cartItems = new LinkedHashSet<>();

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

}
