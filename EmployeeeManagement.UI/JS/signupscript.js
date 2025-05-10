async function signup() {
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    const message = document.getElementById("signupMsg");

    message.style.display = "none";

    try {
        const response = await fetch('http://localhost:8083/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const text = await response.text();

        message.style.display = "block";
        if (response.ok) {
            message.style.color = "green";
            message.textContent = text;
            alert("Signup successful! Redirecting to login...");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            message.style.color = "red";
            message.textContent = text;
            alert("Signup failed: " + text);
        }
    } catch (error) {
        console.error("Signup error:", error);
        message.style.color = "red";
        message.textContent = "Error connecting to server.";
        alert("Signup error: Could not connect to the server.");
    }
}
