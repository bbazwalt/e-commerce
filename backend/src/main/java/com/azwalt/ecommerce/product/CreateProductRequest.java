package com.azwalt.ecommerce.product;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {

	@NotBlank(message = "{product.constraints.image.NotBlank.message}")
	private String image;

	@NotBlank(message = "{product.constraints.title.NotBlank.message}")
	private String title;

	@NotBlank(message = "{product.constraints.brand.NotBlank.message}")
	private String brand;

	@NotBlank(message = "{product.constraints.description.NotBlank.message}")
	private String description;

	@PositiveOrZero(message = "{product.constraints.quantity.PositiveOrZero.message}")
	private int quantity;

	@PositiveOrZero(message = "{product.constraints.price.PositiveOrZero.message}")
	private int price;

	@PositiveOrZero(message = "{product.constraints.discountedPrice.PositiveOrZero.message}")
	private int discountedPrice;

	@Min(value = 0, message = "{product.constraints.discountPercent.Min.message}")
	@Max(value = 100, message = "{product.constraints.discountPercent.Max.message}")
	private int discountPercent;

	@NotBlank(message = "{product.constraints.color.NotBlank.message}")
	private String color;

	@NotBlank(message = "{product.constraints.storage.NotBlank.message}")
	private String storage;

	@NotBlank(message = "{product.constraints.memory.NotBlank.message}")
	private String memory;

	@NotBlank(message = "{product.constraints.firstLevelCategory.NotBlank.message}")
	private String firstLevelCategory;

	@NotBlank(message = "{product.constraints.secondLevelCategory.NotBlank.message}")
	private String secondLevelCategory;

	@NotBlank(message = "{product.constraints.thirdLevelCategory.NotBlank.message}")
	private String thirdLevelCategory;

}
