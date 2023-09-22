document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const parallaxElements = [...document.querySelectorAll(".parallax-item")];

  parallaxElements.forEach((parallaxItem) => {
    const tl = new gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power3.inOUt"
      },
      scrollTrigger: {
        trigger: parallaxItem,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    tl.fromTo(parallaxItem, { y: "100%" }, { y: "-100%" });
  });
});
