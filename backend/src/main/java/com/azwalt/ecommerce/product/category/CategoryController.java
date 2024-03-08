package com.azwalt.ecommerce.product.category;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.shared.ApiConstants;
import com.azwalt.ecommerce.user.UserUtil;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstants.BASE_API_PATH + "/admin/categories")
@Validated
public class CategoryController {

    private final CategoryService categoryService;
    private final UserUtil userUtil;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Category createCategory(@RequestBody @NotNull @Valid CreateCategoryRequest createCategoryRequest)
            throws Exception {
        userUtil.checkIsAdmin();
        return categoryService.createCategory(createCategoryRequest);
    }

    @GetMapping
    public Set<Category> findAllCategories()
            throws Exception {
        userUtil.checkIsAdmin();
        return categoryService.findAllCategories();
    }

}
