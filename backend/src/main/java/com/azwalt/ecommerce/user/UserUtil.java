package com.azwalt.ecommerce.user;

import org.springframework.security.authentication.BadCredentialsException;

public class UserUtil {

    public static void checkIsAdmin(User user) throws Exception {
        if (user == null) {
            throw new IllegalArgumentException("User must not be null.");
        }
        if (!user.isAdmin()) {
            throw new BadCredentialsException("Only admins can perform this action.");
        }
    }
}
