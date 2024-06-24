document.addEventListener('DOMContentLoaded', function () {
    // Toggle Password Visibility
    const togglePassword = document.querySelectorAll('.toggle-password');
    togglePassword.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const passwordInput = document.querySelector(toggle.getAttribute('toggle'));
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? 'Show' : 'Hide';
        });
    });

    //  This Handle Form Submissions
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Add your login logic here
            window.location.href = 'dashboard.html'; // Redirect to dashboard after login
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Add your signup logic here
            alert('Successfully created an account.');
            window.location.href = 'dashboard.html'; // Redirect to dashboard after signup
        });
    }

    // Toggle for login and register forms
    window.toggleForm = function (form) {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const loginToggle = document.getElementById('login-toggle');
        const registerToggle = document.getElementById('register-toggle');

        if (form === 'login') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            loginToggle.classList.add('active');
            registerToggle.classList.remove('active');
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            loginToggle.classList.remove('active');
            registerToggle.classList.add('active');
        }
    };

    // Confirm booking before submission
    window.confirmBooking = function (event) {
        event.preventDefault();

        const hospital = document.getElementById('hospital').value;
        const department = document.getElementById('department').value;
        const doctor = document.getElementById('doctor').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const patientName = document.getElementById('patientName').value;
        const patientAge = document.getElementById('patientAge').value;
        const patientPhone = document.getElementById('patientPhone').value;
        const bookingId = 'BK' + Math.floor(Math.random() * 1000000);

        if (confirm(`Confirm your booking at ${hospital} on ${date} at ${time}?`)) {
            localStorage.setItem('selectedHospital', hospital);
            localStorage.setItem('selectedDepartment', department);
            localStorage.setItem('selectedDoctor', doctor);
            localStorage.setItem('selectedDate', date);
            localStorage.setItem('selectedTime', time);
            localStorage.setItem('patientName', patientName);
            localStorage.setItem('patientAge', patientAge);
            localStorage.setItem('patientPhone', patientPhone);
            localStorage.setItem('bookingId', bookingId);

            window.location.href = 'confirmation.html';
        }
    };

    // confirmation details of last page
    if (document.getElementById('confirmedHospital')) {
        document.getElementById('confirmedHospital').innerText = localStorage.getItem('selectedHospital');
        document.getElementById('confirmedDepartment').innerText = localStorage.getItem('selectedDepartment');
        document.getElementById('confirmedDoctor').innerText = localStorage.getItem('selectedDoctor');
        document.getElementById('confirmedDate').innerText = localStorage.getItem('selectedDate');
        document.getElementById('confirmedTime').innerText = localStorage.getItem('selectedTime');
        document.getElementById('confirmedName').innerText = localStorage.getItem('patientName');
        document.getElementById('confirmedAge').innerText = localStorage.getItem('patientAge');
        document.getElementById('confirmedPhone').innerText = localStorage.getItem('patientPhone');
        document.getElementById('generatedBookingId').innerText = localStorage.getItem('bookingId');
    }

    // hospital locations
    window.showLocation = function () {
        const hospital = localStorage.getItem('selectedHospital');
        const hospitalLocations = {
            'KMCH': 'https://www.google.com/maps/search/?api=1&query=KMCH+Hospital+Coimbatore',
            'PSG': 'https://www.google.com/maps/search/?api=1&query=PSG+Hospital+Coimbatore',
            'Ganga': 'https://www.google.com/maps/search/?api=1&query=Ganga+Hospital+Coimbatore',
            'Sri Ramakrishna': 'https://www.google.com/maps/search/?api=1&query=Sri+Ramakrishna+Hospital+Coimbatore',
            'Coimbatore Medical College': 'https://www.google.com/maps/search/?api=1&query=Coimbatore+Medical+College+Hospital',
            'GEM': 'https://www.google.com/maps/search/?api=1&query=GEM+Hospital+Coimbatore'
        };

        if (hospitalLocations[hospital]) {
            window.location.href = hospitalLocations[hospital];
        } else {
            alert('Location not available');
        }
    };

    // login and registration forms
    window.validateLoginForm = function (event) {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (!username || !password) {
            alert('Please enter username and password');
            event.preventDefault();
        }
    };

    window.validateRegisterForm = function (event) {
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const password = document.getElementById('register-password').value;

        if (!username || !email || !phone || !password) {
            alert('Please fill in all fields');
            event.preventDefault();
        }
    };
});
document.getElementById('logoutButton').addEventListener('click', function() {
    logout(); // Call the logout function when the logout button is clicked
});


// Function to check if the selected doctor is available at the chosen time
function checkDoctorAvailability() {
    const selectedDoctor = document.getElementById('doctor').value;
    const selectedTime = document.getElementById('time').value;
    // Here you would check the availability based on your backend data
    const doctorAvailable = true; // Replace this with your actual availability check logic
    if (!doctorAvailable) {
        alert(`Sorry, ${selectedDoctor} is not available at ${selectedTime}. Please choose another time or doctor.`);
        return false;
    }
    return true;
}

// Modify the confirmBooking function to include doctor availability check
window.confirmBooking = function (event) {
    event.preventDefault();
    if (!checkDoctorAvailability()) {
        return; // Stop booking if doctor is not available
    }
    // Rest of your booking confirmation logic
};


// Array to simulate booked slots (You would replace this with your actual backend data)
const bookedSlots = [];

// Function to check if the selected slot is available
function checkSlotAvailability(selectedTime) {
    return !bookedSlots.includes(selectedTime);
}

// Modify the confirmBooking function to include slot availability check
window.confirmBooking = function (event) {
    event.preventDefault();
    const selectedTime = document.getElementById('time').value;
    if (!checkSlotAvailability(selectedTime)) {
        alert(`Sorry, the selected slot at ${selectedTime} is already booked. Please choose another time.`);
        return;
    }
    // Rest of your booking confirmation logic
};

// Array to simulate booked appointments (Replace this with your actual database)
const bookedAppointments = [];

// Function to check if the selected slot is available
function checkSlotAvailability(selectedHospital, selectedDepartment, selectedDoctor, selectedDate, selectedTime) {
    // Check if the selected slot is already booked
    return !bookedAppointments.some(appointment => (
        appointment.hospital === selectedHospital &&
        appointment.department === selectedDepartment &&
        appointment.doctor === selectedDoctor &&
        appointment.date === selectedDate &&
        appointment.time === selectedTime
    ));
}

// Modify the confirmBooking function to include slot availability check
window.confirmBooking = function (event) {
    event.preventDefault();
    const selectedHospital = document.getElementById('hospital').value;
    const selectedDepartment = document.getElementById('department').value;
    const selectedDoctor = document.getElementById('doctor').value;
    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;

    if (!checkSlotAvailability(selectedHospital, selectedDepartment, selectedDoctor, selectedDate, selectedTime)) {
        alert(`Sorry, the selected slot for ${selectedDoctor} at ${selectedTime} on ${selectedDate} is already booked. Please choose another slot.`);
        return;
    }
    // Rest of your booking confirmation logic
};


