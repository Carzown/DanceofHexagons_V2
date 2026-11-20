"use strict";

const menuButton = document.querySelector(".hamburger");
const navigationMenu = document.querySelector("#primary-menu");

function setNavigationOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navigationMenu.classList.toggle("is-open", isOpen);
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setNavigationOpen(!isOpen);
});

navigationMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNavigationOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setNavigationOpen(false);
    menuButton.focus();
  }
});

const revealElements = document.querySelectorAll(".method-item, .finding-card");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach((element) => {
    element.classList.add("reveal-on-scroll");
    revealObserver.observe(element);
  });
}

const metricBar = document.querySelector(".metric-bar");
const metricFill = document.querySelector(".metric-fill");

if (metricBar && metricFill) {
  const targetWidth = metricFill.dataset.targetWidth || "58%";
  const showMetric = () => {
    metricFill.style.width = targetWidth;
  };

  if ("IntersectionObserver" in window) {
    const metricObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        showMetric();
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    metricObserver.observe(metricBar);
  } else {
    showMetric();
  }
}
