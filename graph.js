document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(MotionPathPlugin);

  const overviewPath = document.querySelector("#overview-path");
  const overviewDot = document.querySelector(".overview-dot");

  let tl = new gsap.timeline({
    repeat: -1
  });

  tl.from(overviewDot, {
    opacity: 0,
    scale: 1.2,
    duration: 0.5,
    delay: 0.5,
    ease: "power3.out"
  })
    .to(
      overviewDot,
      {
        motionPath: {
          path: overviewPath,
          align: overviewPath,
          alignOrigin: [0.5, 0.5]
        },
        duration: 10,
        ease: "power4.inOut"
      },
      "<"
    )
    .to(
      overviewDot,
      {
        duration: 0.5,
        ease: "power3.out",
        opacity: 0,
        scale: 1.2
      },
      ">"
    );
});
