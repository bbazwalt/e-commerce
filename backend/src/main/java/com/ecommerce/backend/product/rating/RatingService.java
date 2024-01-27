package com.ecommerce.backend.product.rating;

import java.util.List;

import com.ecommerce.backend.product.ProductException;
import com.ecommerce.backend.user.User;

public interface RatingService {

	public Rating createRating(RatingRequest request, User user)throws ProductException;
	
	public List<Rating> getProductRatings(Long productId);
	
}
