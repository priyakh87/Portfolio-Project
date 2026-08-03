import { initializeAnimations, revealAll } from "./modules/animations.js";

import { setupContactForm } from "./modules/contact-form.js";
import { setupNavigation } from "./modules/navigation.js";
import { loadSections } from "./modules/section-loader.js";
import { setupTheme } from "./modules/theme.js";

document.documentElement.classList.add("js-enabled");

function updateFooterYear() {
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}

async function startPortfolio() {
  setupTheme();
  setupNavigation();

  await loadSections();

  setupContactForm();
  updateFooterYear();

  try {
    initializeAnimations();
  } catch (error) {
    revealAll();
    console.error("Scroll animation setup failed:", error);
  } finally {
    window.requestAnimationFrame(() => {
      document.documentElement.classList.add("page-ready");
    });
  }
}

startPortfolio().catch((error) => {
  document.documentElement.classList.add("page-ready");
  revealAll();

  console.error("Portfolio startup failed:", error);
});
