package com.azwalt.ecommerce.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.cart.CartService;
import com.azwalt.ecommerce.configuration.TokenProvider;
import com.azwalt.ecommerce.shared.ApiResponse;
import com.azwalt.ecommerce.user.CustomUserService;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserException;
import com.azwalt.ecommerce.user.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("/auth")
public class AuthController {

	private TokenProvider tokenProvider;
	private PasswordEncoder passwordEncoder;
	private CustomUserService customUserService;
	private UserService userService;
	private CartService cartService;

	public AuthController(TokenProvider tokenProvider, PasswordEncoder passwordEncoder,
			CustomUserService customUserService, UserService userService, CartService cartService) {
		super();
		this.tokenProvider = tokenProvider;
		this.passwordEncoder = passwordEncoder;
		this.customUserService = customUserService;
		this.userService = userService;
		this.cartService = cartService;
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody @NotNull @Valid SignUpRequest signupRequest) {
		try {
			User savedUser = userService.createUser(signupRequest);
			cartService.createCart(savedUser);
			Authentication authentication = new UsernamePasswordAuthenticationToken(signupRequest.getUsername(),
					signupRequest.getPassword());
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String token = tokenProvider.generateToken(authentication);
			return new ResponseEntity<>(new AuthResponse(token, signupRequest.isAdmin(), "Sign up successfull."),
					HttpStatus.CREATED);
		} catch (UserException userException) {
			return new ResponseEntity<>(new ApiResponse(userException.getMessage(), false), HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while the signing up.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping("/signin")
	public ResponseEntity<?> signIn(@RequestBody @NotNull @Valid SignInRequest signinRequest) {
		try {
			String username = signinRequest.getUsername();
			String password = signinRequest.getPassword();
			Authentication authentication = authenticate(username, password);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String token = tokenProvider.generateToken(authentication);
			User user = userService.findUserByUsername(username);
			return new ResponseEntity<>(new AuthResponse(token, user.isAdmin(), "Sign in successfull."),
					HttpStatus.ACCEPTED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException illegalArgumentException) {
			return new ResponseEntity<>(new ApiResponse(illegalArgumentException.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while signing in.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	private Authentication authenticate(String username, String password) {
		if (username == null) {
			throw new IllegalArgumentException("Username must not be null.");
		}
		if (password == null) {
			throw new IllegalArgumentException("Password must not be null.");
		}
		UserDetails userDetails = customUserService.loadUserByUsername(username);
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username.");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password.");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
