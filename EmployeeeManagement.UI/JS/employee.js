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

function createEmployee() {
    const empName = document.getElementById("empname").value;
    const dob = document.getElementById("dob").value;
    const doj = document.getElementById("doj").value;
    const deptId = document.getElementById("deptid").value;

    
    if (!empName || !dob || !doj || !deptId) {
        document.getElementById("error-message").innerText = "All fields are required!";
        return;
    }

    const formattedDob = dob; 
    const formattedDoj = new Date(doj).toISOString(); 
    const employeeData = {
        empname: empName,
        dob: formattedDob,
        dateOfJoining: formattedDoj,
        department: { deptid: parseInt(deptId) }
    };

    console.log("Sending employee data:", JSON.stringify(employeeData, null, 2));

    fetch("http://localhost:8083/api/employees/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("Employee added successfully:", data);
        alert("Employee added successfully!");
        loadPage('../HTML/GetAllEmployees.html');
    })
    .catch(error => {
        console.error("Error adding employee:", error);
        document.getElementById("error-message").innerText = "Failed to add employee: " + error.message;
        
    });
}

function loadPage(url) {
    console.log("Redirecting to:", url);
    window.location.href = url;
}

function logout() {
    console.log("Logging out...");
    window.location.href = 'login.html'; 
}

