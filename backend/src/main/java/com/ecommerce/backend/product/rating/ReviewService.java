package com.ecommerce.backend.product.rating;

import java.util.List;

import com.ecommerce.backend.product.ProductException;
import com.ecommerce.backend.user.User;

public interface ReviewService {

	public Review createReview(ReviewRequest request, User user)throws ProductException;

	public List<Review> getAllReviews(Long productId);
}
