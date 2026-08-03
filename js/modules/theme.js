export function setupTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  if (!themeToggle || !themeIcon) {
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");

  let darkMode = savedTheme ? savedTheme === "dark" : prefersDark.matches;

  const applyTheme = () => {
    document.body.classList.toggle("dark-mode", darkMode);

    themeIcon.className = darkMode ? "fa-regular fa-sun" : "fa-regular fa-moon";

    themeToggle.setAttribute("aria-pressed", String(darkMode));
    themeToggle.setAttribute(
      "aria-label",
      darkMode ? "Switch to light mode" : "Switch to dark mode",
    );
  };

  themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    applyTheme();
  });

  prefersDark.addEventListener("change", (event) => {
    if (!localStorage.getItem("theme")) {
      darkMode = event.matches;
      applyTheme();
    }
  });

  applyTheme();
}
