const container = document.querySelector(".container");
const likeBtns = document.querySelectorAll(".like-btn");

let swiper = new Swiper(".swiper", {
  spaceBetween: 30,
  slidesPerView: "auto",
  loop: true,
  speed: 6000,
  freeMode: true,
  allowTouch: false,
  autoplay: {
    delay: 0
  }
});

function stopAutoplay() {
  const swiperTranslate = swiper.getTranslate();
  swiper.getTranslate(swiperTranslate);
  swiper.autoplay.stop();
}

function startAutoplay() {
  swiper.slideTo(swiper.activeIndex, 3000, false);
  swiper.autoplay.start();
}
container.addEventListener("mouseenter", () => stopAutoplay());
container.addEventListener("mouseleave", () => startAutoplay());

likeBtns.forEach((likeBtn) => {
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("active");
    likeBtn.classList.toggle("pulse");
  })
})