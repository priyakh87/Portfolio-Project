import assert from "node:assert/strict";
import test from "node:test";
import { initializeAnimations } from "../js/modules/animations.js";

function createElement() {
  const classes = new Set();

  return {
    classList: {
      add(className) {
        classes.add(className);
      },

      contains(className) {
        return classes.has(className);
      },
    },
  };
}

test("reduced motion reveals every element immediately", () => {
  const elements = [createElement(), createElement()];

  const root = {
    querySelectorAll: () => elements,
  };

  const windowRef = {
    matchMedia: () => ({ matches: true }),
    IntersectionObserver: class {},
  };

  const observer = initializeAnimations(root, windowRef);

  assert.equal(observer, null);

  assert.equal(
    elements.every((element) => element.classList.contains("is-visible")),
    true,
  );
});

test("missing IntersectionObserver reveals everything immediately", () => {
  const elements = [createElement(), createElement()];

  const root = {
    querySelectorAll: () => elements,
  };

  const windowRef = {
    matchMedia: () => ({ matches: false }),
  };

  initializeAnimations(root, windowRef);

  assert.equal(
    elements.every((element) => element.classList.contains("is-visible")),
    true,
  );
});

test("observer reveals and unobserves an intersecting element", () => {
  const element = createElement();

  const root = {
    querySelectorAll: () => [element],
  };

  let observerCallback;
  const unobserved = [];

  class FakeIntersectionObserver {
    constructor(callback) {
      observerCallback = callback;
    }

    observe() {}

    unobserve(target) {
      unobserved.push(target);
    }
  }

  const windowRef = {
    matchMedia: () => ({ matches: false }),
    IntersectionObserver: FakeIntersectionObserver,
  };

  const observer = initializeAnimations(root, windowRef);

  observerCallback([{ isIntersecting: true, target: element }], observer);

  assert.equal(element.classList.contains("is-visible"), true);
  assert.deepEqual(unobserved, [element]);
});
