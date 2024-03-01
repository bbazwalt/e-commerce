package com.azwalt.ecommerce.user;

import java.util.Set;

import com.azwalt.ecommerce.auth.SignUpRequest;
import com.azwalt.ecommerce.order.Address;

public interface UserService {

       public User createUser(SignUpRequest signupRequest) throws Exception;

       public User findUserById(Long id) throws Exception;

       public User findUserByUsername(String username) throws Exception;

       public User findUserByToken(String token) throws Exception;

       public Set<Address> getUserAddresses(Long userId) throws Exception;

}
