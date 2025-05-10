package com.example.emp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.emp.model.User;
import com.example.emp.service.UserService;

@CrossOrigin(origins = "*")
@RestController
public class LoginController {

	@Autowired
	private UserService userService;

	@PostMapping("/api/login")
	public ResponseEntity<String> login(@RequestBody User usermodel) {
		User user = userService.validateUser(usermodel.getUsername(), usermodel.getPassword());
		if (user != null) {
			return ResponseEntity.ok("Login successful for user: " + user.getUsername());
		} else {
			return ResponseEntity.status(401).body("Invalid username or password");
		}
	}

	@PostMapping("/api/signup")
	public ResponseEntity<String> signup(@RequestBody User userModel) {
		if (userService.existsByUsername(userModel.getUsername())) {
			return ResponseEntity.status(409).body("Username already exists.");
		}

		userService.registerUser(userModel);
		return ResponseEntity.ok("User registered successfully.");
	}
}
