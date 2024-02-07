package com.ecommerce.backend.auth;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSignupRequest {

	@NotNull
	@Size(min = 1, max = 255)
	private String firstName;

	@NotNull
	@Size(min = 1, max = 255)
	private String lastName;

	@NotNull
	@Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9_.]{5,28}$", message = "{ecommerce.constraints.username.Pattern.message}")
	private String username;
	
	@NotNull
	@Size(min = 8, max = 255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{ecommerce.constraints.password.Pattern.message}")
	private String password;
}
