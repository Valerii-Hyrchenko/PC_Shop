export const renderOnload = () => {
  const contentToRender = document.querySelectorAll(".render-onload");
  window.addEventListener("load", () => {
    contentToRender.forEach((item) => (item.style.display = "block"));
  });
};
