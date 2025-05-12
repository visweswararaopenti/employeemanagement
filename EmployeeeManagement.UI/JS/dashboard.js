async function showDashboard() {
    try {
        const response = await fetch("http://localhost:8083/api/dashboard/summary");
        const data = await response.json();

        document.getElementById("totalEmployees").textContent = data.totalEmployees;
        document.getElementById("totalDepartments").textContent = data.totalDepartments;
        document.getElementById("recentHiresCount").textContent = data.recentHires;
    } catch (error) {
        console.error("Error loading dashboard summary", error);
    }
}

function logout() {
    window.location.href = "login.html";
}

window.onload = showDashboard;
