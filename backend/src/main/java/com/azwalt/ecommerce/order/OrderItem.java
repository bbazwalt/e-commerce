package com.azwalt.ecommerce.order;

import com.azwalt.ecommerce.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonIgnore
	@ManyToOne
	private Order order;

	@ManyToOne
	private Product product;

	@PositiveOrZero(message = "{product.constraints.quantity.PositiveOrZero.message}")
	private int quantity;

	@PositiveOrZero(message = "{product.constraints.price.PositiveOrZero.message}")
	private int price;

	@PositiveOrZero(message = "{product.constraints.discountedPrice.PositiveOrZero.message}")
	private int discountedPrice;

	@NotNull
	private Long userId;

}
