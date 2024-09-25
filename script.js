function validateLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Simple email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email address.');
        return false; // Prevent form submission
    }

    // Password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false; // Prevent form submission
    }

    // If validation passes, allow form submission
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
