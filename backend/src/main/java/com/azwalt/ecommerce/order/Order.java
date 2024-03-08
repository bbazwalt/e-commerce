package com.azwalt.ecommerce.order;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.azwalt.ecommerce.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "\"Order\"")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@ManyToOne
	private User user;

	@PositiveOrZero(message = "{product.constraints.quantity.PositiveOrZero.message}")
	private int totalItems;

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	private List<OrderItem> orderItems = new ArrayList<>();

	@PositiveOrZero(message = "{product.constraints.price.PositiveOrZero.message}")
	private int totalPrice;

	@PositiveOrZero(message = "{product.constraints.discountedPrice.PositiveOrZero.message}")
	private int totalDiscountedPrice;

	@PositiveOrZero(message = "{product.constraints.price.PositiveOrZero.message}")
	private int discount;

	@ManyToOne
	@JoinColumn(name = "address_id", unique = false)
	private Address address;

	@Enumerated(EnumType.STRING)
	private OrderStatus orderStatus;

	private Instant createdAt;

	private Instant deliveryDate;
}
