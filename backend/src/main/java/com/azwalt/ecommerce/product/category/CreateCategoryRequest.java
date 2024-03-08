package com.azwalt.ecommerce.product.category;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCategoryRequest {

    @NotBlank(message = "{category.constraints.name.NotBlank.message}")
    private String name;

    private Long parentCategoryId;
}
