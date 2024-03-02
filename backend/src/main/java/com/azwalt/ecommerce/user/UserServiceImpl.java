package com.azwalt.ecommerce.user;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.azwalt.ecommerce.auth.SignUpRequest;
import com.azwalt.ecommerce.configuration.TokenProvider;
import com.azwalt.ecommerce.order.Address;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	private TokenProvider tokenProvider;
	private PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, TokenProvider tokenProvider,
			PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.tokenProvider = tokenProvider;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public User createUser(SignUpRequest signUpRequest) throws Exception {
		if (signUpRequest == null) {
			throw new IllegalArgumentException("Sign up request must not be null.");
		}
		String username = signUpRequest.getUsername();
		User isUser = userRepository.findByUsername(username);
		if (isUser != null) {
			throw new UserException("A user with the given username already exists.");
		}
		User createdUser = new User();
		createdUser.setUsername(username);
		createdUser.setFullName(signUpRequest.getFullName());
		createdUser.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
		createdUser.setAdmin(signUpRequest.isAdmin());
		createdUser.setCreatedAt(Instant.now());
		return userRepository.save(createdUser);
	}

	@Override
	public User findUserById(Long id) throws Exception {
		if (id == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		Optional<User> opt = userRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new UserException("No user found with the given ID.");
	}

	@Override
	public User findUserByUsername(String username) throws Exception {
		if (username == null) {
			throw new IllegalArgumentException("Username must not be null.");
		}
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("No user found with the given username.");
		}
		return user;
	}

	@Override
	public User findUserByToken(String token) throws Exception {
		if (token == null || token.trim().isEmpty()) {
			throw new IllegalArgumentException("Token must not be null.");
		}
		String username = tokenProvider.getUsernameFromToken(token);
		return findUserByUsername(username);
	}

	@Override
	public Set<Address> getUserAddresses(Long userId) throws Exception {
		if (userId == null) {
			throw new IllegalArgumentException("User ID must not be null.");
		}
		User user = findUserById(userId);
		return user.getAddresses();
	}

}
