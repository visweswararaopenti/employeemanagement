package com.example.emp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.emp.model.Department;
import com.example.emp.repository.DepartmentRepository;

@Service
public class DepartmentService {

	@Autowired
	private DepartmentRepository departmentRepository;

	public Long getTotalDepartments() {
		return departmentRepository.count();
	}
	
	public Department addDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Integer id, Department updatedDepartment) {
        Department existing = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        existing.setDeptname(updatedDepartment.getDeptname());
        return departmentRepository.save(existing);
    }

    public void deleteDepartment(Integer id) {
        departmentRepository.deleteById(id);
    }

    public Department getDepartmentById(Integer id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
}
