package com.example.emp.service;

import com.example.emp.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService {

	@Autowired
	private DepartmentRepository departmentRepository;

	public Long getTotalDepartments() {
		return departmentRepository.count();
	}
}
