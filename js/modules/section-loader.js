const SECTION_ERROR_MESSAGE =
  "This section could not be loaded. Please refresh the page.";

const LOCAL_SERVER_MESSAGE =
  "This modular portfolio must run through Live Server or GitHub Pages.";

function errorMarkup(message) {
  return `
    <div class="container section-load-error" role="status">
      <p>${message}</p>
    </div>
  `;
}

export async function loadSection(
  shell,
  { fetchImpl = globalThis.fetch, logger = console } = {},
) {
  const source = shell.dataset.sectionSrc;

  try {
    const response = await fetchImpl(source);

    if (!response.ok) {
      throw new Error(`Could not load ${source}: ${response.status}`);
    }

    shell.innerHTML = await response.text();
    shell.dataset.sectionState = "ready";
  } catch (error) {
    shell.innerHTML = errorMarkup(SECTION_ERROR_MESSAGE);
    shell.dataset.sectionState = "error";
    logger.error(`Section loading failed for ${source}:`, error);

    throw error;
  } finally {
    shell.removeAttribute("aria-busy");
  }
}

export async function loadSections(
  root = document,
  {
    fetchImpl = globalThis.fetch,
    logger = console,
    protocol = globalThis.location?.protocol ?? "https:",
  } = {},
) {
  const shells = [...root.querySelectorAll("[data-section-src]")];

  if (protocol === "file:") {
    const error = new Error(LOCAL_SERVER_MESSAGE);

    shells.forEach((shell, index) => {
      shell.removeAttribute("aria-busy");
      shell.dataset.sectionState = "error";

      if (index === 0) {
        shell.innerHTML = errorMarkup(LOCAL_SERVER_MESSAGE);
      } else {
        shell.hidden = true;
      }
    });

    logger.error(LOCAL_SERVER_MESSAGE);

    return [
      {
        status: "rejected",
        reason: error,
      },
    ];
  }

  return Promise.allSettled(
    shells.map((shell) =>
      loadSection(shell, {
        fetchImpl,
        logger,
      }),
    ),
  );
}
