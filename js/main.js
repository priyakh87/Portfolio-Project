// main.js (EmailJS v4+ compatible)
import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm";

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_iykci8c";
const EMAILJS_TEMPLATE_ID = "template_bt2293n";
const EMAILJS_PUBLIC_KEY = "FhRAIYkh64IbqHjWS";

emailjs.init(EMAILJS_PUBLIC_KEY);

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.textContent = message;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: type === "success" ? "#28a745" : "#dc3545",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "6px",
    fontWeight: "600",
    zIndex: "9999",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    opacity: "1",
    transition: "opacity 0.5s ease",
  });
    
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}
function validateEmail(email) {
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
    

document.addEventListener("DOMContentLoaded", function () {
  // Contact form submission
  const form = document.getElementById("contactForm");
  const statusMessage = document.getElementById("status");
  const messageInput = form.message;
  // char count
  const counter = document.createElement("span");
  Object.assign(counter.style, {
    id: "charCount",
    display: "block",
    marginTop: "0.5rem",
    color: "#777",
    fontSize: "0.875rem",
  });
  messageInput.parentNode.insertBefore(counter, messageInput.nextSibling);

  function updateCharCount() {
    const length = messageInput.value.length;
    counter.textContent = `${length} / 300 characters`;
    if (length > 300) {
      counter.style.color = "red";
    } else {
      counter.style.color = "#777";
    }
  }
  messageInput.setAttribute("maxlength", "300");
  messageInput.addEventListener("input", updateCharCount);
  updateCharCount();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || name.length < 2) {
      showToast("Please enter a valid name.", "error");
      return;
    }

    if (!validateEmail(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    if (!message || message.length < 5) {
      showToast("Message must be at least 5 characters long.", "error");
      return;
    }
    if (message.length > 300) {
      showToast("Message must be less than 300 characters.", "error");
      return;
    }
    statusMessage.textContent = "Sending...";

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this).then(
      function () {
        statusMessage.textContent = "Message sent successfully!";
        statusMessage.style.color = "green";
        showToast(statusMessage.textContent, "success");
        form.reset();
      },
      function (error) {
        statusMessage.textContent = "Failed to send message. Please try again.";
        statusMessage.style.color = "red";
        showToast(statusMessage.textContent, "error");
        console.error("EmailJS Error:", error);
      },
    );
  });
  // Smooth scroll for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
  // Hamburger menu
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
  });

  // Optional: Close nav on link click (mobile)
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
    });
  });

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  let darkMode = savedTheme ? savedTheme === "dark" : prefersDark;

  function applyTheme() {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    } else {
      document.body.classList.remove("dark-mode");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  }

  themeToggle.addEventListener("click", function () {
    darkMode = !darkMode;
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    applyTheme();
  });

  applyTheme();

  fetch('experience.html').then(res => res.text()).then(data => {
    document.getElementById('experience').outerHTML = data;
    if (window.renderExperience) window.renderExperience();
  });
  fetch("testimonials.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("testimonials").outerHTML = data;
      if (window.setupCarousel) window.setupCarousel();
    });
    
});

