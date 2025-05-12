package com.example.emp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.emp.model.Employee;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findByDateOfJoiningAfter(LocalDateTime date);
    List<Employee> findTop5ByOrderByDateOfJoiningDesc();
}