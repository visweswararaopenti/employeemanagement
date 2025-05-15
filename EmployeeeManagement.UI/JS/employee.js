function loadEmployees() {
    fetch('http://localhost:8083/api/employees/all-employees')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const table = document.getElementById("employeeTable");
            const tbody = document.getElementById("employeeBody");
            tbody.innerHTML = "";

            if (!data || data.length === 0) {
                tbody.innerHTML = "<tr><td colspan='5'>No employees found.</td></tr>";
                table.style.display = "table";
                return;
            }

            data.forEach(emp => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${emp.empid || 'N/A'}</td>
                    <td>${emp.empname || 'N/A'}</td>
                    <td>${emp.dob || 'N/A'}</td>
                    <td>${emp.dateOfJoining || 'N/A'}</td>
                    <td>${emp.department ? emp.department.deptname : 'N/A'}</td>
                `;
                tbody.appendChild(row);
            });

            table.style.display = "table";
        })
        .catch(error => {
            console.error("Error loading employees:", error);
            alert("Failed to load employees. Check the console for details.");
        });
}
