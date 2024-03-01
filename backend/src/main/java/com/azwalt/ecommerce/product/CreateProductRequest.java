package com.azwalt.ecommerce.product;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {

	@NotNull
	private String title;

	@NotNull
	private String description;

	@NotNull
	private int price;

	@NotNull
	private int discountedPrice;

	@NotNull
	private int discountPercent;

	@NotNull
	private int quantity;

	@NotNull
	private String brand;

	@NotNull
	private String color;

	@NotNull
	private String storage;

	@NotNull
	private String memory;

	@NotNull
	private String image;

	@NotNull
	private String topLevelCategory;

	@NotNull
	private String secondLevelCategory;

	@NotNull
	private String thirdLevelCategory;

}
