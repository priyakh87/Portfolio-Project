import { sendContactForm } from "./email-service.js";

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message, type = "success") {
  const region = document.getElementById("toastRegion");

  if (!region) {
    return;
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  region.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add("is-leaving");

    window.setTimeout(() => {
      toast.remove();
    }, 220);
  }, 3200);
}

export function setupContactForm() {
  const form = document.getElementById("contactForm");

  if (!form) {
    return;
  }

  const statusMessage = document.getElementById("status");
  const counter = document.getElementById("charCount");
  const messageInput = form.elements.message;
  const submitButton = form.querySelector('button[type="submit"]');

  if (!messageInput || !submitButton) {
    return;
  }

  const setStatus = (message) => {
    if (statusMessage) {
      statusMessage.textContent = message;
    }
  };

  const updateCharCount = () => {
    if (counter) {
      counter.textContent = `${messageInput.value.length} / 300`;
    }
  };

  messageInput.addEventListener("input", updateCharCount);
  updateCharCount();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = messageInput.value.trim();

    if (name.length < 2) {
      showToast("Please enter a name with at least 2 characters.", "error");

      form.elements.name.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address.", "error");
      form.elements.email.focus();
      return;
    }

    if (message.length < 5) {
      showToast(
        "Please share at least a few details about your project.",
        "error",
      );

      messageInput.focus();
      return;
    }

    submitButton.disabled = true;
    setStatus("Sending your enquiry...");

    try {
      await sendContactForm(form);

      form.reset();
      updateCharCount();
      setStatus("Thank you - your message has been sent.");
      showToast("Your project enquiry was sent successfully.");
    } catch (error) {
      setStatus(
        "The message could not be sent. Please email me directly instead.",
      );

      showToast(
        "Sending failed. Please use the email link beside the form.",
        "error",
      );

      console.error("EmailJS request failed:", error);
    } finally {
      submitButton.disabled = false;
    }
  });
}
