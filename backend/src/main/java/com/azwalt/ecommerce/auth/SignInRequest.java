package com.azwalt.ecommerce.auth;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignInRequest {

	@NotNull
	@Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9_.]{5,28}$", message = "{user.constraints.username.Pattern.message}")
	private String username;

	@NotNull
	@Size(min = 8, max = 255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{user.constraints.password.Pattern.message}")
	private String password;

}
