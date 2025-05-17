const empId = localStorage.getItem("editEmpId");

window.onload = function () {
    if (!empId) {
        document.getElementById("error-message").innerText = "No Employee ID provided.";
        return;
    }

    fetch(`http://localhost:8083/api/employees/${empId}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch employee data.");
            return res.json();
        })
        .then(employee => {
            document.getElementById("empname").value = employee.empname || '';
            document.getElementById("dob").value = employee.dob ? employee.dob.slice(0, 10) : '';
            document.getElementById("doj").value = employee.dateOfJoining ? employee.dateOfJoining.slice(0, 16) : '';
            document.getElementById("deptid").value = employee.department ? employee.department.deptid : '';
        })
        .catch(error => {
            console.error("Error fetching employee:", error);
            document.getElementById("error-message").innerText = "Error loading employee data.";
        });
};

function updateEmployee() {
    const empname = document.getElementById("empname").value;
    const dob = document.getElementById("dob").value;
    const doj = document.getElementById("doj").value;
    const deptid = document.getElementById("deptid").value;

    if (!empname || !dob || !doj || !deptid) {
        document.getElementById("error-message").innerText = "All fields are required!";
        return;
    }

    const updatedData = {
        empid: parseInt(empId),
        empname: empname,
        dob: dob,
        dateOfJoining: new Date(doj).toISOString(),
        department: {
            deptid: parseInt(deptid)
        }
    };

    fetch(`http://localhost:8083/api/employees/${empId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to update employee.");
            return res.json();
        })
        .then(data => {
            alert("Employee updated successfully!");
            window.location.href = "../HTML/GetAllEmployees.html";
        })
        .catch(error => {
            console.error("Update error:", error);
            document.getElementById("error-message").innerText = "Error updating employee.";
        });
}
