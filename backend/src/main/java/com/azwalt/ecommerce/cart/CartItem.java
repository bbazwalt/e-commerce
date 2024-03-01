package com.azwalt.ecommerce.cart;

import com.azwalt.ecommerce.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonIgnore
	@ManyToOne
	private Cart cart;

	@ManyToOne
	private Product product;

	private int quantity;

	private int price;

	private int discountedPrice;

	private Long userId;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "CartItem{" +
				"id=" + id +
				", cartId=" + (cart != null ? cart.getId() : null) +
				", productId=" + (product != null ? product.getId() : null) +
				", quantity=" + quantity +
				", price=" + price +
				", discountedPrice=" + discountedPrice +
				", userId=" + userId +
				'}';
	}

}
