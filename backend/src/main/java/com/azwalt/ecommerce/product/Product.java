package com.azwalt.ecommerce.product;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String title;

	private String description;

	private int price;

	private int discountedPrice;

	private int discountPercent;

	private int quantity;

	private String brand;

	private String color;

	private String storage;

	private String memory;

	private String image;

	@ManyToOne()
	@JoinColumn(name = "category_id")
	private Category category;

	private Instant createdAt;

}
