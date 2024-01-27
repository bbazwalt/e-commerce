package com.ecommerce.backend.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {

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

	private String imageUrl;
	private String topLevelCategory;
	private String secondLevelCategory;
	private String thirdLevelCategory;

}
