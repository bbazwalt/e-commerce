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
@RequestMapping("/api/v1/ratings")
public class RatingController {

	private UserService userService;
	private RatingService ratingService;

	public RatingController(UserService userService, RatingService ratingService) {
		super();
		this.userService = userService;
		this.ratingService = ratingService;
	}

	@PostMapping("/create")
	public ResponseEntity<Rating> createRating(@RequestBody RatingRequest request,
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException {
		User user = userService.findUserProfileByJwt(jwt);
		Rating rating = ratingService.createRating(request, user);
		return new ResponseEntity<Rating>(rating, HttpStatus.CREATED);
	}

	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Rating>> getProductsRating(@PathVariable Long productId,
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException {
		List<Rating> ratings = ratingService.getProductRatings(productId);
		return new ResponseEntity<List<Rating>>(ratings, HttpStatus.OK);
	}

}
