package com.azwalt.ecommerce.product.category;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CreateCategoryRequest addCategoryRequest) throws Exception {
        Category category = new Category();
        category.setName(addCategoryRequest.getName());
        Category existingCategory = categoryRepository.findByName(addCategoryRequest.getName());
        if (existingCategory != null) {
            throw new CategoryException("Category already exists with the given name.");
        }
        if (addCategoryRequest.getParentCategoryId() != null) {
            Category parentCategory = categoryRepository.findById(addCategoryRequest.getParentCategoryId())
                    .orElseThrow(() -> new CategoryException("No parent category found with the given ID."));
            category.setParentCategory(parentCategory);
            category.setLevel(parentCategory.getLevel() + 1);
        } else {
            category.setParentCategory(null);
            category.setLevel(1);
        }
        return categoryRepository.save(category);
    }

    @Override
    public Set<Category> findAllCategories() {
        return new LinkedHashSet<>(categoryRepository.findAll());
    }

}