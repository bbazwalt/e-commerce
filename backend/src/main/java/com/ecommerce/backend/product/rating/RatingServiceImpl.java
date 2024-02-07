package com.ecommerce.backend.product.rating;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.backend.product.Product;
import com.ecommerce.backend.product.ProductException;
import com.ecommerce.backend.product.ProductService;
import com.ecommerce.backend.user.User;

@Service
public class RatingServiceImpl implements RatingService {

	private RatingRepository ratingRepository;
	private ProductService productService;

	public RatingServiceImpl(RatingRepository ratingRepository, ProductService productService) {
		super();
		this.ratingRepository = ratingRepository;
		this.productService = productService;
	}

	@Override
	public Rating createRating(RatingRequest request, User user) throws ProductException {
		Product product = productService.findProductById(request.getProductId());
		Rating rating = new Rating();
		rating.setProduct(product);
		rating.setUser(user);
		rating.setRating(request.getRating());
		rating.setCreatedAt(Instant.now());
		return ratingRepository.save(rating);
	}

	@Override
	public List<Rating> getProductRatings(Long productId) {

		return ratingRepository.getAllProductsRating(productId);
	}

}
