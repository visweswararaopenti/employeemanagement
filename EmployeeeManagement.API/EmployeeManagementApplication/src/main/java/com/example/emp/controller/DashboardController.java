package com.example.emp.controller;

import com.example.emp.dto.DashboardSummaryDTO;
import com.example.emp.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") 
@RequestMapping("/api/dashboard")
@RestController
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardSummaryDTO getDashboardSummary() {
        return dashboardService.getDashboardSummary();
    }
}