// async function login() {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     const errorMsg = document.getElementById("errorMsg");
//     const successMsg = document.getElementById("successMsg");

//     // Clear previous messages
//     errorMsg.style.display = "none";
//     successMsg.style.display = "none";

//     try {
//         // Send login request to backend
//         const response = await fetch('http://localhost:8083/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username, password })
//         });

//         const text = await response.text();

//         if (response.ok) {
//             // Show success message
//             successMsg.textContent = text;
//             successMsg.style.display = "block";
            
//             // Optional: Redirect to another page (e.g., Dashboard) after successful login
//             setTimeout(() => {
//                 window.location.href = "dashboard.html"; // Redirect to dashboard
//             }, 2000);
//         } else {
//             // Show error message
//             errorMsg.textContent = text;
//             errorMsg.style.display = "block";
//         }
//     } catch (error) {
//         console.error("Login error:", error);
//         errorMsg.textContent = "Error connecting to server.";
//         errorMsg.style.display = "block";
//     }
// }




async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const errorMsg = document.getElementById("errorMsg");
    const successMsg = document.getElementById("successMsg");

    // Clear previous messages
    errorMsg.style.display = "none";
    successMsg.style.display = "none";

    try {
        const response = await fetch('http://localhost:8083/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const text = await response.text();

        if (response.ok) {
            successMsg.textContent = text;
            successMsg.style.display = "block";
            alert("Login successful!");
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);
        } else {
            errorMsg.textContent = text;
            errorMsg.style.display = "block";
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Login error:", error);
        errorMsg.textContent = "Error connecting to server.";
        errorMsg.style.display = "block";
        alert("Login error: Could not connect to the server.");
    }
}
