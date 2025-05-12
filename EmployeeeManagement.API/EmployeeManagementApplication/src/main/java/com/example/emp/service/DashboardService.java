


package com.example.emp.service;

import com.example.emp.dto.DashboardSummaryDTO;
import com.example.emp.repository.DepartmentRepository;
import com.example.emp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;
    
    @Autowired
    private EmployeeService employeeService;

    public DashboardSummaryDTO getDashboardSummary() {
        long totalEmployees = employeeRepository.count();
        long totalDepartments = departmentRepository.count();
        long recentHires = employeeService.getRecentHires().size();

        return new DashboardSummaryDTO(totalEmployees, totalDepartments, recentHires);
    }
}
