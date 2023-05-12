import Slider from "./modules/Slider.js";
import { setCheckboxListener } from "./modules/checkboxProcessing.js";
import { setScrollToTopListener } from "./modules/scrollToTopListener.js";

const useAllSliders = () => {
  const runHomeSlider = () => {
    const wrap = document.getElementById("slider-home-wrap");
    const dots = document.querySelectorAll(".online-shop__slider-switch-btn");
    const minQuantity = document.getElementById("slider-home-min");
    const maxQuantity = document.getElementById("slider-home-max");

    const homeSlider = new Slider({
      wrap,
      blockId: "slider-home-container",
      dots,
      btn: false,
      minQuantity,
      maxQuantity,
      activeDotClassName: "online-shop__slider-switch-btn--active",
      slidesToShow: 1,
      delay: 7000,
    });

    return homeSlider;
  };

  const homeSlider = runHomeSlider();

  const runRecommSlider = () => {
    const wrap = document.getElementById("slider-recomm-wrap");
    const btn = document.getElementById("recomm__slider-btn-next");

    const recommSlider = new Slider({
      wrap,
      blockId: "slider-recomm-container",
      dots: false,
      slidesToShow: 4,
      delay: 5000,
      btn: btn,
    });
    return recommSlider;
  };

  const recommSlider = runRecommSlider();

  window.addEventListener("resize", () => {
    homeSlider.setSliderWith();
    recommSlider.setSliderWith();
  });
};

useAllSliders();
setCheckboxListener();
setScrollToTopListener();
