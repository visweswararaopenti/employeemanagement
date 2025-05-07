package com.example.emp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.emp.model.User;
import com.example.emp.service.UserService;



@RestController
public class LoginController {
	@Autowired
	private UserService userService;

	@PostMapping("/api/login")
	public ResponseEntity<String> login(@RequestBody User usermodel) {
	    User user = userService.validateUser(usermodel.getUsername(),usermodel.getPassword());
	    if (user != null) {
	        return ResponseEntity.ok("Login successful for user: " + user.getUsername());
	    } else {
	        return ResponseEntity.status(401).body("Invalid username or password");
	    }
	}
}