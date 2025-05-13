package com.example.emp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.emp.model.Employee;
import com.example.emp.service.EmployeeService;

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
	
	@GetMapping("/all-employees")
	public ResponseEntity<List<Employee>> getAllEmployees() {
		return ResponseEntity.ok(employeeService.getAllEmployees());
	}
	
	@PostMapping("/add")
	public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
	    Employee savedEmployee = employeeService.saveEmployee(employee);
	    return ResponseEntity.ok(savedEmployee);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Integer id, @RequestBody Employee employee) {
	    Employee updatedEmployee = employeeService.updateEmployee(id, employee);
	    if (updatedEmployee != null) {
	        return ResponseEntity.ok(updatedEmployee);
	    }
	    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}


}
