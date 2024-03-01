package com.azwalt.ecommerce.user;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.order.Address;
import com.azwalt.ecommerce.shared.ApiResponse;

import jakarta.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}

	@GetMapping("/profile")
	public ResponseEntity<?> findUserProfile(@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (UserException userException) {
			return new ResponseEntity<>(new ApiResponse(userException.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while getting the user profile.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/addresses")
	public ResponseEntity<?> getUserAddresses(@RequestHeader("Authorization") String token) {
		try {
			User user = userService.findUserByToken(token);
			Set<Address> addresses = userService.getUserAddresses(user.getId());
			return new ResponseEntity<>(addresses, HttpStatus.OK);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
