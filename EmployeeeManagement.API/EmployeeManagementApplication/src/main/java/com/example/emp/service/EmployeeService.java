package com.example.emp.service;

import com.example.emp.model.Employee;
import com.example.emp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	public Long getTotalEmployees() {
		return employeeRepository.count();
	}

	public List<Employee> getRecentHires() {
		LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);

		return employeeRepository.findAll().stream()
				.filter(emp -> emp.getDateOfJoining() != null && emp.getDateOfJoining().isAfter(thirtyDaysAgo))
				.collect(Collectors.toList());

	}
}