import assert from "node:assert/strict";
import test from "node:test";
import { loadSection, loadSections } from "../js/modules/section-loader.js";

function createShell(source) {
  return {
    dataset: { sectionSrc: source },
    hidden: false,
    innerHTML: "",
    removedAttributes: [],

    removeAttribute(name) {
      this.removedAttributes.push(name);
    },
  };
}

test("loadSection inserts HTML and clears the loading state", async () => {
  const shell = createShell("sections/about.html");

  const fetchImpl = async () => ({
    ok: true,
    text: async () => "<div>About loaded</div>",
  });

  await loadSection(shell, {
    fetchImpl,
    logger: { error() {} },
  });

  assert.equal(shell.innerHTML, "<div>About loaded</div>");
  assert.equal(shell.dataset.sectionState, "ready");
  assert.deepEqual(shell.removedAttributes, ["aria-busy"]);
});

test("loadSection displays an accessible error for a failed response", async () => {
  const shell = createShell("sections/missing.html");

  const fetchImpl = async () => ({
    ok: false,
    status: 404,
  });

  await assert.rejects(
    loadSection(shell, {
      fetchImpl,
      logger: { error() {} },
    }),
    /Could not load sections\/missing.html: 404/,
  );

  assert.equal(shell.dataset.sectionState, "error");
  assert.match(shell.innerHTML, /role="status"/);
  assert.match(shell.innerHTML, /could not be loaded/i);
  assert.deepEqual(shell.removedAttributes, ["aria-busy"]);
});

test("loadSections settles every request when one section fails", async () => {
  const shells = [
    createShell("sections/about.html"),
    createShell("sections/missing.html"),
  ];

  const root = {
    querySelectorAll: () => shells,
  };

  const fetchImpl = async (source) => {
    if (source.includes("missing")) {
      return {
        ok: false,
        status: 404,
      };
    }

    return {
      ok: true,
      text: async () => "<div>Loaded</div>",
    };
  };

  const results = await loadSections(root, {
    fetchImpl,
    logger: { error() {} },
    protocol: "https:",
  });

  assert.deepEqual(
    results.map(({ status }) => status),
    ["fulfilled", "rejected"],
  );

  assert.equal(shells[0].dataset.sectionState, "ready");
  assert.equal(shells[1].dataset.sectionState, "error");
});

test("loadSections explains that file protocol needs Live Server", async () => {
  const shells = [
    createShell("sections/hero.html"),
    createShell("sections/about.html"),
  ];

  const root = {
    querySelectorAll: () => shells,
  };

  const results = await loadSections(root, {
    logger: { error() {} },
    protocol: "file:",
  });

  assert.equal(results[0].status, "rejected");
  assert.match(shells[0].innerHTML, /Live Server/i);
  assert.equal(shells[1].hidden, true);
});