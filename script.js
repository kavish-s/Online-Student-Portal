function validateLogin(event) {
    event.preventDefault(); // Prevent the form from being submitted

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Simple email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email address.');
        return false; // Stop form processing
    }

    // Password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false; // Stop form processing
    }

    // If validation passes, redirect to the home page
    window.location.href = "home.html"; // Simulate a login and navigate to home
    return true;
}

// Handle admission form submission
function submitAdmission(event) {
    event.preventDefault(); // Prevent page reload
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;

    // Display success message
    const successMsg = document.getElementById("success-msg");
    successMsg.textContent = `Admission successful for ${name}.`;
}
