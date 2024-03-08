package com.azwalt.ecommerce.user;

import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.order.Address;
import com.azwalt.ecommerce.shared.ApiConstants;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstants.BASE_API_PATH + "/users")
public class UserController {

	private final UserUtil userUtil;

	@GetMapping("/profile")
	public User findUserProfile() throws Exception {
		return userUtil.getCurrentUser();
	}

	@GetMapping("/addresses")
	public Set<Address> findUserAddresses() throws Exception {
		return userUtil.getCurrentUser().getAddresses();
	}
}
