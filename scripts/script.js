// Function to validate login form
function validateLogin(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Simple email validation using regex
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email address.');
        return false; // Stop the validation process
    }

    // Password validation: check if it has at least 6 characters
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false; // Stop the validation process
    }

    // Simulate a successful login by redirecting to "home.html"
    window.location.href = "/pages/home.html"; // Redirect to the home page after validation
}

// Attach validateLogin function to the form submit event
document.getElementById("login-form").addEventListener("submit", validateLogin);


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
