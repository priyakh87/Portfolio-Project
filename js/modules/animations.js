export function revealAll(root = document) {
  root.querySelectorAll("[data-reveal]").forEach((element) => {
    element.classList.add("is-visible");
  });
}

export function initializeAnimations(root = document, windowRef = window) {
  const revealElements = [...root.querySelectorAll("[data-reveal]")];

  const reducedMotion = windowRef.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion || typeof windowRef.IntersectionObserver !== "function") {
    revealAll(root);
    return null;
  }

  const observer = new windowRef.IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

  return observer;
}
