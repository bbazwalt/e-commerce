package com.azwalt.ecommerce.user;

import java.time.Instant;
import java.util.Optional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.azwalt.ecommerce.auth.SignUpRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	public User createUser(SignUpRequest signUpRequest) throws Exception {
		String username = signUpRequest.getUsername();
		Optional<User> isUser = userRepository.findByUsername(username);
		if (isUser.isPresent()) {
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
		Optional<User> opt = userRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new UserException("No user found with the given ID.");
	}

	@Override
	public User findUserByUsername(String username) {
		return userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("No user found with the given username."));
	}
}
