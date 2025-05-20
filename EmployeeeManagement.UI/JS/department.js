const API_URL = 'http://localhost:8083/api/departments';

function loadDepartments() {
    fetch(`${API_URL}/all-departments`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const table = document.getElementById("departmentTable");
            const tbody = document.getElementById("departmentBody");
            tbody.innerHTML = "";

            if (!data || data.length === 0) {
                tbody.innerHTML = "<tr><td colspan='3'>No departments found.</td></tr>";
                table.style.display = "table";
                return;
            }

            data.forEach(dept => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${dept.deptid || 'N/A'}</td>
                    <td>${dept.deptname || 'N/A'}</td>
                    <td class="action-buttons">
                        <button onclick="editDepartment(${dept.deptid})">Edit</button>
                        <button onclick="deleteDepartment(${dept.deptid})">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            table.style.display = "table";
        })
        .catch(error => {
            console.error("Error loading departments:", error);
            alert("Failed to load departments. Check console.");
        });
}

function createDepartment() {
    const deptname = document.getElementById("deptname").value;
    const errorMessage = document.getElementById("error-message");

    if (!deptname) {
        errorMessage.innerText = "Department name is required!";
        return;
    }

    const departmentData = {
        deptname: deptname
    };

    fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departmentData)
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to add department");
        return response.json();
    })
    .then(data => {
        alert("Department added successfully!");
        window.location.href = "../HTML/GetAllDepartments.html";
    })
    .catch(error => {
        console.error("Error adding department:", error);
        errorMessage.innerText = "Error: " + error.message;
    });
}

function editDepartment(id) {
    localStorage.setItem("editDeptId", id);
    window.location.href = "../HTML/UpdateDepartment.html";
}

function deleteDepartment(deptId) {
    if (!confirm("Are you sure you want to delete this department?")) return;

    fetch(`${API_URL}/${deptId}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.status === 204) {
            alert("Department deleted successfully!");
            loadDepartments();
        } else if (response.status === 404) {
            alert("Department not found!");
        } else {
            return response.text().then(text => {
                throw new Error(`Unexpected error occurred: ${text}`);
            });
        }
    })
    .catch(error => {
        console.error("Delete error:", error);
        alert("Error deleting department: " + error.message);
    });
}


function searchDepartmentById() {
    const input = document.getElementById("searchDeptIdInput"); // ✅ Corrected ID
    if (!input) {
        alert("Search input not found in the document.");
        return;
    }

    const id = input.value;
    if (!id) {
        alert("Please enter a Department ID");
        return;
    }

    fetch(`${API_URL}/${id}`)
        .then(response => {
            if (response.status === 404) {
                throw new Error("Department not found");
            }
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            return response.json();
        })
        .then(dept => {
            const table = document.getElementById("departmentTable");
            const tbody = document.getElementById("departmentBody");
            tbody.innerHTML = "";

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${dept.deptid || 'N/A'}</td>
                <td>${dept.deptname || 'N/A'}</td>
                <td class="action-buttons">
                    <button onclick="editDepartment(${dept.deptid})">Edit</button>
                    <button onclick="deleteDepartment(${dept.deptid})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
            table.style.display = "table";
        })
        .catch(error => {
            const table = document.getElementById("departmentTable");
            const tbody = document.getElementById("departmentBody");
            tbody.innerHTML = `<tr><td colspan='3'>${error.message}</td></tr>`;
            table.style.display = "table";
        });
}

function loadDepartmentData() {
    const deptId = localStorage.getItem("editDeptId");
    if (!deptId) {
        document.getElementById("error-message").innerText = "No department ID provided";
        return;
    }

    fetch(`${API_URL}/${deptId}`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to load department");
            return response.json();
        })
        .then(dept => {
            document.getElementById("deptname").value = dept.deptname || '';
        })
        .catch(error => {
            console.error("Error loading department:", error);
            document.getElementById("error-message").innerText = "Error: " + error.message;
        });
}

function updateDepartment() {
    const deptId = localStorage.getItem("editDeptId");
    const deptname = document.getElementById("deptname").value;
    const errorMessage = document.getElementById("error-message");

    if (!deptId) {
        errorMessage.innerText = "No department ID provided";
        return;
    }
    if (!deptname) {
        errorMessage.innerText = "Department name is required!";
        return;
    }

    const departmentData = {
        deptname: deptname
    };

    fetch(`${API_URL}/${deptId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departmentData)
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to update department");
        return response.json();
    })
    .then(data => {
        alert("Department updated successfully!");
        localStorage.removeItem("editDeptId");
        window.location.href = "../HTML/GetAllDepartments.html";
    })
    .catch(error => {
        console.error("Error updating department:", error);
        errorMessage.innerText = "Error: " + error.message;
    });
}

function logout() {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('UpdateDepartment.html')) {
        loadDepartmentData();
    }
});
