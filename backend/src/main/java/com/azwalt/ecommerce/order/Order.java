package com.azwalt.ecommerce.order;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.azwalt.ecommerce.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	private List<OrderItem> orderItems = new ArrayList<>();

	private Instant orderDate;

	private Instant deliveryDate;

	@ManyToOne
	@JoinColumn(name = "address_id", unique = false)
	private Address address;

	private int totalPrice;

	private int totalDiscountedPrice;

	private int discount;

	private String orderStatus;

	private int totalItems;

	private Instant createdAt;
}
