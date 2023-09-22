document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const text = new SplitType(".split-type", {
    types: "lines",
    lineClass: "split-line"
  });

  gsap.set([".split-type", ".split-line"], { opacity: 1 });

  const splitWrappers = [...document.querySelectorAll(".split-wrapper")];

  splitWrappers.forEach((splitWrapper) => {
    const splitLines = [...splitWrapper.querySelectorAll(".split-line")];

    const tl = new gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: "power4.out",
        stagger: {
          each: 0.125
        }
      },
      scrollTrigger: {
        trigger: splitWrapper,
        start: "top 75%"
      }
    });

    tl.from(splitLines, { y: "2.5rem", opacity: 0 }, { y: "0rem", opacity: 1 });
  });
});
