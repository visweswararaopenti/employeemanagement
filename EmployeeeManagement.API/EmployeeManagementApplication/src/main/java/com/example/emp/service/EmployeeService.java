package com.example.emp.service;

import com.example.emp.model.Employee;
import com.example.emp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	public Long getTotalEmployees() {
		return employeeRepository.count();
	}

	public List<Employee> getRecentHires() {
		return employeeRepository.findTop5ByOrderByDateOfJoiningDesc();
	}
}