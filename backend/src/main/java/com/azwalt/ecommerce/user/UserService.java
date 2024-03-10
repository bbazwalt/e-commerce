package com.azwalt.ecommerce.user;

import com.azwalt.ecommerce.auth.SignUpRequest;

public interface UserService {

    public User createUser(SignUpRequest signupRequest) throws Exception;

    public User findUserById(Long id) throws Exception;

    public User findUserByUsername(String username) throws Exception;

}
