// HEALTH DOC - Main JavaScript File
// Includes animations, form handling, and localStorage database functionality

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeAnimations();
    initializeFormHandling();
    initializeDatabase();
    initializeResponsiveMenu();
});

// Animation Functions
function initializeAnimations() {
    // Fade in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.service-box, .icon-box, .patient, .feedback, .about2-left, .about2-right').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Typing animation for main headings
    const typingElements = document.querySelectorAll('.typing-animation');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    });
}

// Form Handling Functions
function initializeFormHandling() {
    // Patient Registration Form
    const patientForm = document.querySelector('form[action="connect.php"]');
    if (patientForm) {
        patientForm.addEventListener('submit', handlePatientForm);
    }

    // Feedback Form
    const feedbackForm = document.querySelector('.feedback form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackForm);
    }

    // Contact Form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Ambulance Booking Form
    const ambulanceForm = document.querySelector('.ambulance-form');
    if (ambulanceForm) {
        ambulanceForm.addEventListener('submit', handleAmbulanceForm);
    }

    // Payment Form
    const paymentForm = document.querySelector('.payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentForm);
    }
}

// Database Functions (using localStorage)
function initializeDatabase() {
    // Initialize database if it doesn't exist
    if (!localStorage.getItem('healthDocDB')) {
        localStorage.setItem('healthDocDB', JSON.stringify({
            patients: [],
            feedback: [],
            contacts: [],
            ambulanceBookings: [],
            payments: []
        }));
    }
}

// Form Submission Handlers
function handlePatientForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const patientData = {
        id: Date.now(),
        name: formData.get('pname'),
        phone: formData.get('phone'),
        age: formData.get('age'),
        doctorName: formData.get('dname'),
        patientAddress: formData.get('paddress'),
        doctorAddress: formData.get('daddress'),
        timestamp: new Date().toISOString()
    };

    // Save to database
    saveToDatabase('patients', patientData);
    
    // Show success message
    showNotification('Patient registration successful!', 'success');
    
    // Reset form
    e.target.reset();
}

function handleFeedbackForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const feedbackData = {
        id: Date.now(),
        name: formData.get('name'),
        phone: formData.get('number'),
        email: formData.get('email'),
        comment: formData.get('comment'),
        timestamp: new Date().toISOString()
    };

    // Save to database
    saveToDatabase('feedback', feedbackData);
    
    // Show success message
    showNotification('Feedback submitted successfully!', 'success');
    
    // Reset form
    e.target.reset();
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };

    // Save to database
    saveToDatabase('contacts', contactData);
    
    // Show success message
    showNotification('Message sent successfully!', 'success');
    
    // Reset form
    e.target.reset();
}

function handleAmbulanceForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const ambulanceData = {
        id: Date.now(),
        patientName: formData.get('patientName'),
        phone: formData.get('phone'),
        pickupAddress: formData.get('pickupAddress'),
        destination: formData.get('destination'),
        emergencyType: formData.get('emergencyType'),
        additionalInfo: formData.get('additionalInfo'),
        timestamp: new Date().toISOString()
    };

    // Save to database
    saveToDatabase('ambulanceBookings', ambulanceData);
    
    // Show success message
    showNotification('Ambulance booking successful!', 'success');
    
    // Reset form
    e.target.reset();
}

function handlePaymentForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const paymentData = {
        id: Date.now(),
        patientName: formData.get('patientName'),
        phone: formData.get('phone'),
        amount: formData.get('amount'),
        paymentMethod: formData.get('paymentMethod'),
        description: formData.get('description'),
        timestamp: new Date().toISOString()
    };

    // Save to database
    saveToDatabase('payments', paymentData);
    
    // Show success message
    showNotification('Payment processed successfully!', 'success');
    
    // Reset form
    e.target.reset();
}

// Database Helper Functions
function saveToDatabase(collection, data) {
    const db = JSON.parse(localStorage.getItem('healthDocDB'));
    db[collection].push(data);
    localStorage.setItem('healthDocDB', JSON.stringify(db));
}

function getFromDatabase(collection) {
    const db = JSON.parse(localStorage.getItem('healthDocDB'));
    return db[collection] || [];
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Responsive Menu Functions
function initializeResponsiveMenu() {
    const toggleButton = document.querySelector('.toggle-button');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (toggleButton && navbarLinks) {
        toggleButton.addEventListener('click', function() {
            navbarLinks.classList.toggle('active');
            toggleButton.classList.toggle('active');
        });
    }
}

// Search and Filter Functions
function searchPatients(query) {
    const patients = getFromDatabase('patients');
    return patients.filter(patient => 
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.phone.includes(query) ||
        patient.doctorName.toLowerCase().includes(query.toLowerCase())
    );
}

function filterPatientsByAge(minAge, maxAge) {
    const patients = getFromDatabase('patients');
    return patients.filter(patient => 
        patient.age >= minAge && patient.age <= maxAge
    );
}

// Export Functions for Admin Panel
function exportData(collection) {
    const data = getFromDatabase(collection);
    const csvContent = convertToCSV(data);
    downloadCSV(csvContent, `${collection}_${new Date().toISOString().split('T')[0]}.csv`);
}

function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header];
            return `"${value}"`;
        });
        csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize when page loads
window.addEventListener('load', function() {
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Initialize any page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
            initializeHomePage();
            break;
        case 'about.html':
            initializeAboutPage();
            break;
        case 'booking.html':
            initializeBookingPage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
        case 'pay.html':
            initializePaymentPage();
            break;
    }
});

// Page-specific initialization functions
function initializeHomePage() {
    // Add scroll-triggered animations
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.parallax');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

function initializeAboutPage() {
    // Add counter animations
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        
        function updateCounter() {
            const current = parseInt(counter.textContent);
            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        }
        
        updateCounter();
    });
}

function initializeBookingPage() {
    // Initialize date picker restrictions
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

function initializeContactPage() {
    // Initialize map functionality if needed
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        // Add map initialization code here
        console.log('Map container found');
    }
}

function initializePaymentPage() {
    // Initialize payment form validation
    const paymentForm = document.querySelector('.payment-form');
    if (paymentForm) {
        const amountInput = paymentForm.querySelector('input[name="amount"]');
        if (amountInput) {
            amountInput.addEventListener('input', function() {
                const value = parseFloat(this.value);
                if (value < 0) {
                    this.value = 0;
                }
            });
        }
    }
}
