export const setScrollToTopListener = () => {
  window.addEventListener("scroll", () => {
    scrollToTop.style.display = window.scrollY > 500 ? "block" : "none";
  });
  const scrollToTop = document.getElementById("scroll-to-top");
  scrollToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};
