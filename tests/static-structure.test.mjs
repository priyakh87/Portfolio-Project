import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

const sectionMarkers = {
  hero: 'id="hero-title"',
  about: 'id="about-title"',
  projects: 'id="projects-title"',
  experience: 'id="experience-title"',
  skills: 'id="skills-title"',
  contact: 'id="contact-title"',
};

async function readProjectFile(relativePath) {
  return readFile(new URL(relativePath, projectRoot), "utf8");
}

test("all six section partials exist and contain their heading", async () => {
  for (const [name, headingMarker] of Object.entries(sectionMarkers)) {
    const content = await readProjectFile(`sections/${name}.html`);
    assert.match(content, new RegExp(headingMarker));
  }
});

test("section partials contain inner markup only", async () => {
  for (const name of Object.keys(sectionMarkers)) {
    const content = await readProjectFile(`sections/${name}.html`);

    assert.doesNotMatch(content, /<section\b/i);
    assert.doesNotMatch(content, /<\/section>/i);
    assert.doesNotMatch(content, /<!doctype/i);
  }
});
test("index contains six semantic section shells", async () => {
  const index = await readProjectFile("index.html");

  const shellMatches =
    index.match(/data-section-src="sections\/[a-z-]+\.html"/g) ?? [];

  assert.equal(shellMatches.length, 6);
  assert.match(index, /id="experience"/);
  assert.match(index, /href="#experience">Experience<\/a>/);
});

test("index uses the modular app entry", async () => {
  const index = await readProjectFile("index.html");

  assert.match(index, /<script type="module" src="js\/app\.js"><\/script>/);

  assert.doesNotMatch(index, /src="js\/main\.js"/);
});