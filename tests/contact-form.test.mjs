import assert from "node:assert/strict";
import test from "node:test";
import { isValidEmail } from "../js/modules/contact-form.js";

test("isValidEmail accepts a normal email address", () => {
  assert.equal(isValidEmail("priya@example.com"), true);
});

test("isValidEmail rejects invalid email addresses", () => {
  assert.equal(isValidEmail("priya@"), false);
  assert.equal(isValidEmail("priya khanna@example.com"), false);
  assert.equal(isValidEmail(""), false);
});
