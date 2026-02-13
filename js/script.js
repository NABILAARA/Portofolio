//start switch lampu
const toggleBtn = document.getElementById("lightToggle");
const bubble = document.getElementById("modeBubble");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("lights-off");

  const certTrack = document.querySelector(".cert-track");

  if (document.body.classList.contains("lights-off")) {
    toggleBtn.textContent = "🔌⚡";
    certTrack.style.transform = "translateX(0)";
    bubble.textContent = "⚠ YOU CUT THE CABLE, THE POWER IS OUT!";
  } else {
    toggleBtn.textContent = "🔌──✂️──🔌";
    certTrack.style.transform = "";
    bubble.textContent = "⚠ ELECTRIC POWER STABLE";
  }

  /* SHOW BUBBLE */
  bubble.classList.add("show");

  /* AUTO HIDE */
  setTimeout(() => {
    bubble.classList.remove("show");
  }, 2000);
});



//end

const sections = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".menu a");

let current = 0;
let scrolling = false;

function isMobile() {
  return window.matchMedia("(max-width: 786px)").matches;
}

function setActive(index){
  sections.forEach(s => s.classList.remove("active"));
  navLinks.forEach(l => l.classList.remove("active"));

  sections[index].classList.add("active");
  navLinks[index].classList.add("active");



  // ===== SOSMED VISIBILITY =====
  const sosmed = document.querySelector(".btn-sosmed");
  if (sosmed) {
    if (index === 0) {
      sosmed.classList.add("show");   // HOME
    } else {
      sosmed.classList.remove("show"); // section lain
    }
  }

  sections[index].scrollIntoView({ behavior: "smooth" });
}

const projects = document.getElementById("projects");
const projectScroll = document.querySelector("#projects .project-scroll");

projectScroll.addEventListener("wheel", e => {

  const scrollTop = projectScroll.scrollTop;
  const scrollHeight = projectScroll.scrollHeight;
  const clientHeight = projectScroll.clientHeight;

  const atTop = scrollTop <= 0;
  const atBottom = scrollTop + clientHeight >= scrollHeight - 2;

  /* MASIH BISA SCROLL → BIARKAN */
  if (
    (e.deltaY > 0 && !atBottom) ||
    (e.deltaY < 0 && !atTop)
  ) {
    e.stopPropagation();
    return;
  }

  /* MENTOK BAWAH → CONTACT */
  if (e.deltaY > 0 && atBottom) {
    e.preventDefault();
    e.stopPropagation();
    current = 4;
    setActive(current);
  }

  /* MENTOK ATAS → SKILLS */
  if (e.deltaY < 0 && atTop) {
    e.preventDefault();
    e.stopPropagation();
    current = 2;
    setActive(current);
  }

}, { passive: false });



/* klik navbar */
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    current = +link.dataset.index;
    setActive(current);
  });
});

let lastScrollTime = 0;
const scrollDelay = 800; // waktu antar scroll

window.addEventListener("wheel", e => {

  const now = Date.now();
  if (now - lastScrollTime < scrollDelay) return;

  const skillsSection = document.getElementById("skills");
  const certMarquee = document.querySelector(".cert-marquee");

  /* ============================= */
  /* SKILLS + LIGHTS OFF */
  /* ============================= */
  if (
    current === 2 &&
    document.body.classList.contains("lights-off")
  ) {

    const rect = certMarquee.getBoundingClientRect();
    const insideCert =
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (insideCert) return;

    if (e.deltaY > 0 && current < sections.length - 1) {
      current = 3;
    }

    if (e.deltaY < 0 && current > 0) {
      current = 1;
    }

    setActive(current);
    lastScrollTime = now;
    return;
  }

  /* ============================= */
  /* PROJECT SCROLL SAFE */
  /* ============================= */
  if (e.target.closest(".project-scroll")) {
    return;
  }

  e.preventDefault();

  if (e.deltaY > 0 && current < sections.length - 1) {
    current++;
  }

  if (e.deltaY < 0 && current > 0) {
    current--;
  }

  setActive(current);
  lastScrollTime = now;

}, { passive: false });





/* hamburger */
document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  if (!hamburger || !menu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("open");
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const original = document.querySelector(".btn-sosmed");
  if (!original) return;

  // clone sosmed for mobile
  const mobileClone = original.cloneNode(true);
  mobileClone.classList.add("btn-sosmed-mobile");
  mobileClone.setAttribute("aria-hidden", "true");
  document.body.appendChild(mobileClone);

  function updateSosmed() {
    const isMobile = window.matchMedia("(max-width: 786px)").matches;

    if (isMobile) {
      original.style.display = "none";
      mobileClone.style.display = "flex";
    } else {
      original.style.display = "flex";
      mobileClone.style.display = "none";
    }
  }

  updateSosmed();
  window.addEventListener("resize", updateSosmed);
});



// init emailjs
  (function(){
    emailjs.init("25b_wPFUZuAj8wXZy");
  })();

  // form submit
  document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    emailjs.send("service_jqvn033", "template_4vae84s", {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    })
    .then(() => {
      alert("Message sent successfully! 🚀");
    })
    .catch(() => {
      alert("Failed to send message ❌");
    });
  });



  // DRAG SCROLL SUPER SMOOTH 
document.addEventListener("DOMContentLoaded", () => {

  const certMarquee = document.querySelector(".cert-marquee");
  const certTrack = document.querySelector(".cert-track");

  let maxScroll = 0;

  function calculateLimit() {
  const images = certTrack.querySelectorAll("img");

  let totalWidth = 0;

  // BATASI SAMPAI SLIDE KE-7 (index 0–6)
  const limitSlide = 7; 

  for (let i = 0; i < limitSlide; i++) {
    if (images[i]) {
      totalWidth += images[i].offsetWidth;
    }
  }

  maxScroll = totalWidth - certMarquee.clientWidth;
  if (maxScroll < 0) maxScroll = 0;
}


  calculateLimit();
  window.addEventListener("resize", calculateLimit);

  /* ============================= */
  /* LIMIT SCROLL SAAT LIGHTS OFF */
  /* ============================= */

  certMarquee.addEventListener("scroll", () => {
    if (!document.body.classList.contains("lights-off")) return;

    if (certMarquee.scrollLeft > maxScroll) {
      certMarquee.scrollLeft = maxScroll;
    }

    if (certMarquee.scrollLeft < 0) {
      certMarquee.scrollLeft = 0;
    }
  });

});


