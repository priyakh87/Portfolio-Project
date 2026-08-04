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
  testimonial: 'id="testimonial-title"',
  contact: 'id="contact-title"',
};

async function readProjectFile(relativePath) {
  return readFile(new URL(relativePath, projectRoot), "utf8");
}

test("all seven section partials exist and contain their heading", async () => {
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
test("index contains seven semantic section shells", async () => {
  const index = await readProjectFile("index.html");

  const shellMatches =
    index.match(/data-section-src="sections\/[a-z-]+\.html"/g) ?? [];

  assert.equal(shellMatches.length, 7);
  assert.match(index, /id="experience"/);
  assert.match(index, /href="#experience">Experience<\/a>/);
  assert.match(index, /id="testimonial"/);
  assert.match(index, /data-section-src="sections\/testimonial\.html"/);
});


test("testimonial uses the approved review and semantic markup", async () => {
  const testimonial = await readProjectFile("sections/testimonial.html");

  assert.match(testimonial, /<figure\b/i);
  assert.match(testimonial, /<blockquote\b/i);
  assert.match(testimonial, /<figcaption\b/i);
  assert.match(testimonial, /aria-label="Rated 5 out of 5 stars"/);
  assert.match(testimonial, /Jijin Baiju/);
  assert.match(testimonial, /adds real value to any team\./);
  assert.doesNotMatch(testimonial, /<img\b/i);
  assert.doesNotMatch(testimonial, /href="#"/i);
});

test("testimonial appears between skills and contact", async () => {
  const index = await readProjectFile("index.html");
  const skillsPosition = index.indexOf('id="skills"');
  const testimonialPosition = index.indexOf('id="testimonial"');
  const contactPosition = index.indexOf('id="contact"');

  assert.ok(skillsPosition < testimonialPosition);
  assert.ok(testimonialPosition < contactPosition);
});

test("index uses the modular app entry", async () => {
  const index = await readProjectFile("index.html");

  assert.match(index, /<script type="module" src="js\/app\.js"><\/script>/);

  assert.doesNotMatch(index, /src="js\/main\.js"/);
});