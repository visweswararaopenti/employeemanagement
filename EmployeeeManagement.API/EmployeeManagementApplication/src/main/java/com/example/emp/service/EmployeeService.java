package com.example.emp.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
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
                .filter(emp -> emp.getDateOfJoining() != null &&
                        (emp.getDateOfJoining().isAfter(thirtyDaysAgo)
                                || emp.getDateOfJoining().isEqual(thirtyDaysAgo)))
                .sorted(Comparator.comparing(Employee::getDateOfJoining).reversed())
                .collect(Collectors.toList());
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee); 
    }

    public Employee updateEmployee(Integer id, Employee employee) {
        Optional<Employee> existingEmployee = employeeRepository.findById(id);
        if (existingEmployee.isPresent()) {
            Employee emp = existingEmployee.get();
            emp.setEmpname(employee.getEmpname());
            emp.setDob(employee.getDob());
            emp.setDateOfJoining(employee.getDateOfJoining());
            emp.setDepartment(employee.getDepartment());
            emp.setEmail(employee.getEmail());
            emp.setMobile(employee.getMobile());
            return employeeRepository.save(emp);
        }
        return null;
    }

    public boolean deleteEmployee(Integer id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Employee getEmployeeById(Integer id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        return employee.orElse(null);
    }
}
