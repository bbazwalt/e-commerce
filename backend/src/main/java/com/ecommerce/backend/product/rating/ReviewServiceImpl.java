package com.ecommerce.backend.product.rating;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.backend.product.Product;
import com.ecommerce.backend.product.ProductException;
import com.ecommerce.backend.product.ProductService;
import com.ecommerce.backend.user.User;

@Service
public class ReviewServiceImpl implements ReviewService {

	private ReviewRepository reviewRepository;
	private ProductService productService;

	public ReviewServiceImpl(ReviewRepository reviewRepository, ProductService productService) {
		super();
		this.reviewRepository = reviewRepository;
		this.productService = productService;
	}

	@Override
	public Review createReview(ReviewRequest request, User user) throws ProductException {
		Product product = productService.findProductById(request.getProductId());

		Review review = new Review();
		review.setUser(user);
		review.setProduct(product);
		review.setReview(request.getReview());
		review.setCreatedAt(LocalDateTime.now());
		return reviewRepository.save(review);
	}

	@Override
	public List<Review> getAllReviews(Long productId) {
		return reviewRepository.getAllProductsReview(productId);
	}

}
