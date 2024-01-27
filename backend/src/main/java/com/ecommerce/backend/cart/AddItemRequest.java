package com.ecommerce.backend.cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddItemRequest {

	private Long productId;
	private String storage;
	private String memory;
	private int quantity;
	private Integer price;
}
