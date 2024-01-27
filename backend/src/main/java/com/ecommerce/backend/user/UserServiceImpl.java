package com.ecommerce.backend.user;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ecommerce.backend.configuration.JwtProvider;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	private JwtProvider jwtProvider;

	public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
		super();
		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
	}
	

	@Override
	public User findUserById(Long id) throws UserException {
		Optional<User> user = userRepository.findById(id);
		if (user.isPresent()) {
			return user.get();
		}
		throw new UserException("No user found with the id - " + id);
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email = jwtProvider.getEmailFromToken(jwt);
		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new UserException("No user found with the email - " + email);

		}
		return user;
	}

}
