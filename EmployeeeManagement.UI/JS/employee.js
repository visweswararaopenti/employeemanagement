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
                tbody.innerHTML = "<tr><td colspan='6'>No employees found.</td></tr>";
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
                    <td class="action-buttons">
                        <button onclick="editEmployee(${emp.empid})">Edit</button>
                       
                    </td>
                `;
                tbody.appendChild(row);
            });

            table.style.display = "table";
        })
        .catch(error => {
            console.error("Error loading employees:", error);
            alert("Failed to load employees. Check console.");
        });
}

function createEmployee() {
    const empName = document.getElementById("empname").value;
    const dob = document.getElementById("dob").value;
    const doj = document.getElementById("doj").value;
    const deptId = document.getElementById("deptid").value;

    if (!empName || !dob || !doj || !deptId) {
        document.getElementById("error-message").innerText = "All fields are required!";
        return;
    }

    const employeeData = {
        empname: empName,
        dob: dob,
        dateOfJoining: new Date(doj).toISOString(),
        department: { deptid: parseInt(deptId) }
    };

    fetch("http://localhost:8083/api/employees/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData)
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to add employee");
        return response.json();
    })
    .then(data => {
        alert("Employee added successfully!");
        window.location.href = "../HTML/GetAllEmployees.html";
    })
    .catch(error => {
        console.error("Error adding employee:", error);
        document.getElementById("error-message").innerText = "Error: " + error.message;
    });
}


function editEmployee(id) {
    localStorage.setItem("editEmpId", id);
    window.location.href = "../HTML/updateemp.html";
}

