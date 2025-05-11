package com.example.emp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.emp.model.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
}