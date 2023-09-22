document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  window.onscroll = function () {
    if (window.scrollY > 90) {
      navbar.classList.add("is-blur");
    } else {
      navbar.classList.remove("is-blur");
    }
  };

  if (window.innerWidth < 992) {
    const navButton = document.querySelector(".nav-button");
    navButton.onclick = () => {
      if (navButton.classList.contains("is-open")) {
        navButton.classList.remove("is-open");
        navClose();
      } else {
        navButton.classList.add("is-open");
        navOpen();
      }
    };

    const navChildren = document
      .querySelector(".mobile-nav")
      .querySelector(".nav-links").children;

    const openNav = new gsap.timeline({
      defaults: { duration: 0.5, ease: "power3.out" }
    });
    openNav.paused(true);

    openNav
      .from(".nav-button-line.is-1", { y: "-0.5rem" })
      .from(".nav-button-line.is-2", { y: "0.5rem" }, "<")
      .to(".nav-button-line.is-1", { rotateZ: "90deg", delay: 0.25 }, "<")
      .to(".nav-button", { rotateZ: "45deg" }, "<")
      .to(".mobile-nav", { height: "100vh" }, "<")
      .from(
        navChildren,
        {
          y: "-2rem",
          scale: 0.5,
          opacity: 0,
          delay: 0.125,
          stagger: { each: 0.05 }
        },
        "<"
      );

    function navOpen() {
      openNav.restart();
    }

    function navClose() {
      openNav.reverse();
    }
  }
});
