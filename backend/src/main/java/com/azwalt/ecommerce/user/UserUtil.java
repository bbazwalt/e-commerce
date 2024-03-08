package com.azwalt.ecommerce.user;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserUtil {

    private final UserService userService;

    public User getCurrentUser() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BadCredentialsException("No authenticated user found.");
        }
        String username = authentication.getName();
        return userService.findUserByUsername(username);
    }

    public void checkIsAdmin() throws Exception {
        if (!getCurrentUser().isAdmin()) {
            throw new BadCredentialsException("Only admins can perform this action.");
        }
    }
}
