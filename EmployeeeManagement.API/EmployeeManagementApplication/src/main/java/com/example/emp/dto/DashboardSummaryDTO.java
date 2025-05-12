package com.example.emp.dto;

public class DashboardSummaryDTO {
    private long totalEmployees;
    private long totalDepartments;
    private long recentHires;

    // Constructors
    public DashboardSummaryDTO(long totalEmployees, long totalDepartments, long recentHires) {
        this.totalEmployees = totalEmployees;
        this.totalDepartments = totalDepartments;
        this.recentHires = recentHires;
    }

    // Getters and setters
    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public long getRecentHires() {
        return recentHires;
    }

    public void setRecentHires(long recentHires) {
        this.recentHires = recentHires;
    }
}
