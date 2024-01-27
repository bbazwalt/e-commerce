package com.ecommerce.backend.user;

public interface UserService {
       public User findUserById(Long id ) throws UserException;
       
       public User findUserProfileByJwt(String jwt) throws UserException;
       
       
}
