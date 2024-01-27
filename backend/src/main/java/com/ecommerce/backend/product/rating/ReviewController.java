package com.ecommerce.backend.product.rating;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.product.ProductException;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserException;
import com.ecommerce.backend.user.UserService;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

	private ReviewService reviewService;
	private UserService userService;

	public ReviewController(ReviewService reviewService, UserService userService) {
		super();
		this.reviewService = reviewService;
		this.userService = userService;
	}

	@PostMapping("/create")
	public ResponseEntity<Review> createReview(@RequestBody ReviewRequest request,
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException {
		User user = userService.findUserProfileByJwt(jwt);
		Review review = reviewService.createReview(request, user);
		return new ResponseEntity<Review>(review, HttpStatus.CREATED);
	}

	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Review>> getProductReviews(@PathVariable Long productId)
			throws UserException, ProductException {
		List<Review> reviews = reviewService.getAllReviews(productId);
		return new ResponseEntity<List<Review>>(reviews, HttpStatus.OK);
	}

}
