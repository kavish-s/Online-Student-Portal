// Function to validate login form
function validateLogin(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    const sapId = document.getElementById('login-sap-id').value;
    const password = document.getElementById('login-password').value;

    // SAP ID validation (should be between 70102200000 and 70102201000)
    const sapIdNumber = parseInt(sapId, 10); // Convert to integer for comparison
    if (sapIdNumber < 70102200000 || sapIdNumber > 70102201000) {
        alert('Please enter a valid SAP ID between 70102200000 and 70102201000.');
        return false;
    }

    // Password validation:
    // - Minimum 8 characters
    // - At least one special character
    // - At least one uppercase letter
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/;
    if (!password.match(passwordPattern)) {
        alert('Password must be at least 8 characters long, include one special character, and one uppercase letter.');
        return false;
    }

    // Simulate a successful login by redirecting to "home.html"
    window.location.href = "./pages/home.html"; // Redirect to the home page after validation
}

// Show/Hide password functionality
document.getElementById('show-password').addEventListener('change', function() {
    const passwordField = document.getElementById('login-password');
    if (this.checked) {
        passwordField.type = 'text'; // Show password
    } else {
        passwordField.type = 'password'; // Hide password
    }
});

// Attach validateLogin function to the form submit event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-form").addEventListener("submit", validateLogin);
});
