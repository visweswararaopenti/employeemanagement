package com.example.emp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.emp.model.User;
import com.example.emp.repository.UserRepository;

   @Service
    public class UserService {
    @Autowired
    private UserRepository userRepository;
           public User validateUser(String username, String password) {
              User user = userRepository.findByUsername(username);
                if (user != null && user.getPassword().equals(password)) {
                return user;
                }
                
                  return null;
           }
           public boolean existsByUsername(String username) {
        	    return userRepository.findByUsername(username) != null;
        	}

        	public void registerUser(User user) {
        	    userRepository.save(user); // Save user to DB
        	}

}