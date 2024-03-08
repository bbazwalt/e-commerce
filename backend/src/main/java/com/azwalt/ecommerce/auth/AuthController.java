package com.azwalt.ecommerce.auth;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.configuration.TokenProvider;
import com.azwalt.ecommerce.user.CustomUserService;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserService;
import com.azwalt.ecommerce.user.UserUtil;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Validated
public class AuthController {

	private final TokenProvider tokenProvider;
	private final PasswordEncoder passwordEncoder;
	private final CustomUserService customUserService;
	private final UserService userService;
	private final UserUtil userUtil;

	@PostMapping("/signup")
	@ResponseStatus(HttpStatus.CREATED)
	public AuthResponse signUp(@RequestBody @NotNull @Valid SignUpRequest signupRequest) throws Exception {
		userService.createUser(signupRequest);
		Authentication authentication = authenticate(signupRequest.getUsername(), signupRequest.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = tokenProvider.generateToken(authentication);
		return new AuthResponse(token, signupRequest.isAdmin(), "Sign up successfull.");
	}

	@PostMapping("/signin")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public AuthResponse signIn(@RequestBody @NotNull @Valid SignInRequest signinRequest) throws Exception {
		Authentication authentication = authenticate(signinRequest.getUsername(), signinRequest.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = tokenProvider.generateToken(authentication);
		User user = userUtil.getCurrentUser();
		return new AuthResponse(token, user.isAdmin(), "Sign in successfull.");
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserService.loadUserByUsername(username);
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid username or password.");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
