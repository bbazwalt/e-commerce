package com.ecommerce.backend.auth;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.cart.CartService;
import com.ecommerce.backend.configuration.JwtProvider;
import com.ecommerce.backend.user.CustomUserServiceImpl;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserException;
import com.ecommerce.backend.user.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	private PasswordEncoder passwordEncoder;
	private CustomUserServiceImpl customUserServiceImpl;
	private CartService cartService;

	public AuthController(UserRepository userRepository, JwtProvider jwtProvider, PasswordEncoder passwordEncoder,
			CustomUserServiceImpl customUserServiceImpl, CartService cartService) {
		super();
		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
		this.passwordEncoder = passwordEncoder;
		this.customUserServiceImpl = customUserServiceImpl;
		this.cartService = cartService;
	}

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@Valid @RequestBody UserSignupRequest request)
			throws UserException {
		try {
			String username = request.getUsername();
			String password = request.getPassword();
			String firstName = request.getFirstName();
			String lastName = request.getLastName();

			User isUsernameExists = userRepository.findByUsername(username);

			if (isUsernameExists != null) {
				throw new UserException("Username is already used with another account");
			}

			User createdUser = new User();
			createdUser.setUsername(username);
			createdUser.setPassword(passwordEncoder.encode(password));
			createdUser.setFirstName(firstName);
			createdUser.setLastName(lastName);
			createdUser.setCreatedAt(Instant.now());
			User savedUser = userRepository.save(createdUser);
			cartService.createCart(savedUser);
			Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getUsername(),
					savedUser.getPassword());
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String token = jwtProvider.generateToken(authentication);
			AuthResponse authResponse = new AuthResponse(token, "Signup successfull");
			return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
		} catch (UserException e) {
			AuthResponse authResponse = new AuthResponse();
			authResponse.setMessage("The given username is already used with another account");
			return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
		}

	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginUserHandler(@Valid @RequestBody LoginRequest loginRequest)
			throws BadCredentialsException {
		try {
			String username = loginRequest.getUsername();
			String password = loginRequest.getPassword();
			Authentication authentication = authenticate(username, password);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String token = jwtProvider.generateToken(authentication);
			AuthResponse authResponse = new AuthResponse(token, "Signin successfull");
			return new ResponseEntity<>(authResponse, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException e) {
			AuthResponse authResponse = new AuthResponse();
			authResponse.setMessage(e.getMessage());
			return new ResponseEntity<>(authResponse, HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException e) {
			AuthResponse authResponse = new AuthResponse();
			authResponse.setMessage(e.getMessage());
			return new ResponseEntity<>(authResponse, HttpStatus.UNAUTHORIZED);
		}

	}

	private Authentication authenticate(String username, String password) throws BadCredentialsException {
		UserDetails userDetails = customUserServiceImpl.loadUserByUsername(username);
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
