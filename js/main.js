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
  updateCharCount(); // Init on load

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
});
