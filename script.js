// Toggle Menu Functionality
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active');
}

// Close Menu When a Link is Clicked
function closeMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.remove('active');
}

// Sticky Navbar Functionality
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
});

// Function to change the event (called by onclick in HTML)
function changeEvent(direction) {
  const eventCards = document.querySelectorAll('.event-card');
  let currentEventIndex = 0;

  // Find the currently active event card
  eventCards.forEach((card, index) => {
    if (card.classList.contains('active')) {
      currentEventIndex = index;
    }
  });

  // Update the current event index based on direction (1 for next, -1 for previous)
  currentEventIndex += direction;

  // Handle wrapping around the event list
  if (currentEventIndex < 0) {
    currentEventIndex = eventCards.length - 1; // Go to the last event
  } else if (currentEventIndex >= eventCards.length) {
    currentEventIndex = 0; // Go to the first event
  }

  // Show the updated event
  showEvent(currentEventIndex);
}

// Function to show the event at the specified index
function showEvent(index) {
  const eventCards = document.querySelectorAll('.event-card');

  // Hide all event cards
  eventCards.forEach(card => card.classList.remove('active'));

  // Show the event card at the specified index
  eventCards[index].classList.add('active');
}

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Testimonial Carousel with Fade Effect (Only runs if testimonials exist)
  const testimonials = document.querySelectorAll('.testimonial-item');

  if (testimonials.length > 0) {
    let currentTestimonial = 0;

    function showNextTestimonial() {
      testimonials[currentTestimonial].classList.remove('active');
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      testimonials[currentTestimonial].classList.add('active');
    }

    // Start the carousel
    setInterval(showNextTestimonial, 7000); // Change testimonial every 7 seconds
  }

  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');

  if (backToTopButton) {
    // Show or hide the button based on scroll position
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    // Smooth scroll to top when the button is clicked
    backToTopButton.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Modals for Services (Only runs if modals exist)
  const modals = document.querySelectorAll('.modal');
  const learnMoreButtons = document.querySelectorAll('.learn-more');
  const closeButtons = document.querySelectorAll('.close');

  if (modals.length > 0) {
    // Open modal when "Learn More" is clicked
    learnMoreButtons.forEach(button => {
      button.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'flex';
      });
    });

    // Close modal when "X" is clicked
    closeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
      });
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function (e) {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    });

    // Close modal and scroll to footer when "Contact Us" is clicked
    const contactButtons = document.querySelectorAll('.modal-content .btn');
    contactButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const modal = this.closest('.modal');
        modal.style.display = 'none'; // Hide the modal
        document.querySelector('#footer-contact').scrollIntoView({
          behavior: 'smooth' // Smooth scroll to footer
        });
      });
    });
  }

  // Initialize the events carousel by showing the first event
  const eventCards = document.querySelectorAll('.event-card');
  if (eventCards.length > 0) {
    showEvent(0); // Show the first event by default
  }
});

// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

if (darkModeToggle) {
  // Check if dark mode is enabled in localStorage
  if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');

    // Update the icon and save the preference in localStorage
    if (body.classList.contains('dark-mode')) {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
}