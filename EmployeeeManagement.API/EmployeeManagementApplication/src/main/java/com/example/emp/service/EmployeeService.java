package com.example.emp.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.emp.model.Employee;
import com.example.emp.repository.EmployeeRepository;

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
				.filter(emp -> emp.getDateOfJoining() != null && (emp.getDateOfJoining().isAfter(thirtyDaysAgo)
				 ||  emp.getDateOfJoining().isEqual(thirtyDaysAgo)))
				.sorted(Comparator.comparing(Employee::getDateOfJoining).reversed())
				.collect(Collectors.toList());

	}
	
	public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
	
	public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
}