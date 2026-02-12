
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