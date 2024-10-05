// Function to validate login form using SAP ID and password rules
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

// Handle admission form submission
function submitAdmission(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;

    const successMsg = document.getElementById("success-msg");
    successMsg.textContent = `Admission successful for ${name}.`;
}

// Image Carousel logic
function initCarousel() {
    let currentIndex = 0; // Track the current index of the carousel
    const items = document.querySelectorAll('.carousel-item'); // Get all carousel items
    const totalItems = items.length; // Total number of items

    // Function to update the carousel display
    function updateCarousel() {
        const offset = -currentIndex * 100; // Calculate offset based on the current index
        document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`; // Apply offset
    }

    // Event listeners for navigation buttons
    document.getElementById('prev').addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1; // Move to the previous item or wrap around
        updateCarousel(); // Update the carousel display
    });

    document.getElementById('next').addEventListener('click', () => {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0; // Move to the next item or wrap around
        updateCarousel(); // Update the carousel display
    });

    // Optional: Automatically advance the carousel every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000);
}

// Attach all event listeners after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Attach validateLogin function to the form submit event
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", validateLogin);
    }

    // Attach show/hide password toggle event
    const showPasswordCheckbox = document.getElementById('show-password');
    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener('change', function() {
            const passwordField = document.getElementById('login-password');
            if (this.checked) {
                passwordField.type = 'text'; // Show password
            } else {
                passwordField.type = 'password'; // Hide password
            }
        });
    }

    // Initialize the carousel only if the carousel exists on the page
    const carouselContainer = document.querySelector('.carousel-images');
    if (carouselContainer) {
        initCarousel();
    }
});

// Function to download the marksheet by fetching data from the table in marks.html
function downloadMarksheet() {
    const username = prompt("Enter your login username:");
    if (!username) {
        alert("Username is required to download the marksheet.");
        return;
    }

    // Get the table rows from marks.html
    const marksTableBody = document.getElementById('marks-body');
    const rows = marksTableBody.getElementsByTagName('tr');

    // Array to store marks data for XLSX
    const marksData = [["Subject", "Marks"]]; // First row is the header

    // Loop through the rows of the table and extract data
    for (let i = 0; i < rows.length; i++) {
        const subject = rows[i].getElementsByTagName('td')[0].innerText;
        const marks = rows[i].getElementsByTagName('td')[1].innerText;
        marksData.push([subject, marks]);
    }

    // Create a new workbook and sheet for marks
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(marksData);

    // Append the sheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Marks");

    // Add username to the filename and download the file
    const filename = `${username}_marksheet.xlsx`;
    XLSX.writeFile(wb, filename);
}
