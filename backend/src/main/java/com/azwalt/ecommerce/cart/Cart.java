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

	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<CartItem> cartItems = new LinkedHashSet<>();

	private int totalPrice;

	private int totalItems;

	private int totalDiscountedPrice;

	private int discount;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "Cart{" +
				"id=" + id +
				", userId=" + (user != null ? user.getId() : "null") +
				", cartItemsSize=" + (cartItems != null ? cartItems.size() : 0) +
				", totalPrice=" + totalPrice +
				", totalItems=" + totalItems +
				", totalDiscountedPrice=" + totalDiscountedPrice +
				", discount=" + discount +
				'}';
	}

}
