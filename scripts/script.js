// Function to validate login form
function validateLogin(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Simple email validation using regex
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Password validation: check if it has at least 6 characters
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    // Simulate a successful login by redirecting to "home.html"
    window.location.href = "./pages/home.html"; // Redirect to the home page after validation
}

// Attach validateLogin function to the form submit event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-form").addEventListener("submit", validateLogin);
});


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


setInterval(showNextImage, 3000); // Change image every 3 seconds

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
