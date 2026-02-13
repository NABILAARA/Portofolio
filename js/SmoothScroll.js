
// ===============================
// SMOOTH SCROLL + ACTIVE SECTION
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  const sections = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".menu a");
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  // ===============================
  // SMOOTH SCROLL CLICK
  // ===============================
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60, // offset navbar
          behavior: "smooth"
        });
      }

      // Close menu in mobile after click
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        hamburger.classList.remove("active");
      }
    });
  });

  // ===============================
  // ACTIVE SECTION ON SCROLL
  // ===============================
  function activateSection() {

    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - window.innerHeight / 2) {
        current = section.getAttribute("id");
      }
    });

    sections.forEach(section => {
      section.classList.remove("active");
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
    });

    if (current) {
      document.getElementById(current)?.classList.add("active");
      document
        .querySelector(`.menu a[href="#${current}"]`)
        ?.classList.add("active");
    }
  }

  window.addEventListener("scroll", activateSection);
  window.addEventListener("load", activateSection);

  // ===============================
  // HAMBURGER TOGGLE
  // ===============================
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      menu.classList.toggle("open");
    });
  }

});
