document.addEventListener("DOMContentLoaded", () => {
  const mainSwiper = new Swiper(".swiper.is-main-block", {
    effect: "slide",
    speed: 600,
    slidesPerView: "auto",
    keyboard: true,
    navigation: {
      nextEl: ".timeline-button.is-next",
      prevEl: ".timeline-button.is-prev"
    }
  });

  const yearSwiper = new Swiper(".swiper.is-year", {
    effect: "slide",
    direction: "vertical",
    speed: 600,
    slidesPerView: "auto",
    keyboard: true
  });

  const thumbSwiper = new Swiper(".swiper.is-thumb", {
    effect: "slide",
    speed: 600,
    slidesPerView: "auto",
    thumbs: {
      swiper: yearSwiper
    }
  });

  mainSwiper.controller.control = thumbSwiper;
  thumbSwiper.controller.control = mainSwiper;
});
