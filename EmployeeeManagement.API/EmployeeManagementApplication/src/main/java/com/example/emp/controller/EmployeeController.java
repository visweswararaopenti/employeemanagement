package com.example.emp.controller;

import com.example.emp.model.Employee;
import com.example.emp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	@GetMapping("/total-employees")
	public ResponseEntity<Long> getTotalEmployees() {
		return ResponseEntity.ok(employeeService.getTotalEmployees());
	}

	@GetMapping("/recent-hires")
	public ResponseEntity<List<Employee>> getRecentHires() {
		return ResponseEntity.ok(employeeService.getRecentHires());
	}
}
