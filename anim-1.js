document.addEventListener("DOMContentLoaded", () => {
  const anim1Blocks = [...document.querySelectorAll(".anim-1")];

  gsap.set(".anim-1", { opacity: 1 });

  anim1Blocks.forEach((animBlock) => {
    const children = animBlock.children;

    const tl = new gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: "power4.out",
        stagger: {
          each: 0.125
        }
      },
      scrollTrigger: {
        trigger: animBlock,
        start: "top 75%"
      }
    });

    tl.fromTo(children, { y: "2.5rem", opacity: 0 }, { y: "0rem", opacity: 1 });
  });
});
