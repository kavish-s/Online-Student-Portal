// Function to validate login form using SAP ID and password rules
function validateLogin(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    const sapId = document.getElementById('login-sap-id').value;
    const password = document.getElementById('login-password').value;

    // SAP ID validation (should be between 70102200000 and 70102201000)
    const sapIdNumber = parseInt(sapId, 10); // Convert to integer for comparison
    if (isNaN(sapIdNumber) || sapIdNumber < 70102200000 || sapIdNumber > 70102201000) {
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

    // Store SAP ID in localStorage as the logged-in state
    localStorage.setItem('loggedInSapId', sapId);

    // Redirect to the home page after validation
    window.location.href = "./pages/home.html";
}

// Function to check if the user is logged in
function checkLoginStatus() {
    const loggedInSapId = localStorage.getItem('loggedInSapId');
    if (!loggedInSapId) {
        // If no user is logged in, redirect to login page
        window.location.href = "../index.html";
    }
}

// Call the checkLoginStatus function on each protected page (e.g., home, attendance, marks)
document.addEventListener("DOMContentLoaded", () => {
    // Check login status if on protected pages
    const path = window.location.pathname.split("/").pop();
    if (path !== 'index.html') {
        checkLoginStatus();
    }

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
            passwordField.type = this.checked ? 'text' : 'password'; // Show/hide password
        });
    }

    // Initialize the carousel only if the carousel exists on the page
    const carouselContainer = document.querySelector('.carousel-images');
    if (carouselContainer) {
        initCarousel();
    }

    // If on the admission page, attach the admission form submit handler
    const admissionForm = document.getElementById("admission-form");
    if (admissionForm) {
        admissionForm.addEventListener("submit", submitAdmission);
    }

    // Check for the download marksheet button and attach the handler
    const downloadMarksheetBtn = document.getElementById("download-marksheet");
    if (downloadMarksheetBtn) {
        downloadMarksheetBtn.addEventListener("click", downloadMarksheet);
    }
});

// Function to log out the user
function logout() {
    // Clear the login state from localStorage
    localStorage.removeItem('loggedInSapId');
    // Redirect back to the login page
    window.location.href = "../index.html";
}

// Handle admission form submission
function submitAdmission(event) {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const course = document.getElementById("course").value;
    const address = document.getElementById("address").value;

    const admissionData = {
        firstName,
        lastName,
        email,
        phone,
        course,
        address
    };

    fetch('http://localhost:5000/api/admission/submit-admission', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(admissionData)
    })
    .then(response => response.json())
    .then(data => {
        const successMsg = document.getElementById("success-msg");
        successMsg.textContent = data.message;
    })
    .catch(error => {
        console.error('Error submitting admission:', error);
    });
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
