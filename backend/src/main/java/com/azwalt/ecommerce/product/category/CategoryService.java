package com.azwalt.ecommerce.product.category;

import java.util.Set;

public interface CategoryService {

    public Category createCategory(CreateCategoryRequest createCategoryRequest) throws Exception;

    public Set<Category> findAllCategories();
    
}
