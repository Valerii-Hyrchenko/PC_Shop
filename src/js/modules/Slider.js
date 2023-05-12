export default class Slider {
  constructor(options) {
    const {
      wrap,
      blockId,
      dots,
      btn,
      minQuantity,
      maxQuantity,
      activeDotClassName,
      slidesToShow,
      delay,
    } = options;
    this.wrap = wrap;
    this.blockId = blockId;
    this.counter = 0;
    this.dots = dots;
    this.btn = btn;
    this.minQuantity = minQuantity;
    this.maxQuantity = maxQuantity;
    this.activeDotClassName = activeDotClassName;
    this.slidesToShow = slidesToShow;
    this.delay = delay;
    this.adaptiveCount = {
      large: this.slidesToShow,
      width1240: 3,
      width1110: 2,
      width820: 1,
    };
    this.setSliderWith();
    this.firstRender();
    this.setListeners();
    this.rollSlidesInfinity();
  }

  firstRender() {
    const cloneSlides = ({ slidersToClone }) => {
      slidersToClone.forEach((item, index) => {
        const clonedSlide = item.cloneNode(true);
        if (index === 0) clonedSlide.setAttribute("cloned", "");
        this.block.append(clonedSlide);
      });
    };

    this.slidersQuantity = this.slides.length;

    if (this.dots) {
      this.minQuantity.innerText = "01";
      this.maxQuantity.innerText = `0${this.slidersQuantity}`;
      this.showActiveDot(this.counter);
    }
    let slidersToClone = this.slides.slice(0, this.slidesToShow);

    cloneSlides({ slidersToClone });

    this.slides = [...this.block.children];
  }

  setSliderWith() {
    this.adaptationSliderWidth();
    this.block = document.getElementById(this.blockId);
    this.slides = [...this.block.children];
    this.slideItemWith = this.slides[0].offsetWidth;
    this.block.style.width = `${
      ((this.slideItemWith + 24) * this.slides.length) / 16
    }rem`;
    this.wrap.style.width = `${
      ((this.slideItemWith + 24) * this.slidesToShow) / 16
    }rem`;
  }

  adaptationSliderWidth() {
    let windowWidth = window.screen.width;
    const { large, width1240, width1110, width820 } = this.adaptiveCount;
    if (windowWidth > 1240 && large > 1) this.slidesToShow = large;
    if (windowWidth < 1241 && windowWidth > 1110 && large > 1) {
      this.slidesToShow = width1240;
    }
    if (windowWidth < 1111 && windowWidth > 820 && large > 1) {
      this.slidesToShow = width1110;
    }
    if (windowWidth < 821 && large > 1) this.slidesToShow = width820;
  }

  showActiveDot(activeDot) {
    this.dots.forEach((item) => item.classList.remove(this.activeDotClassName));
    this.dots[activeDot >= this.dots.length ? 0 : activeDot].classList.add(
      this.activeDotClassName
    );
  }

  rollOneSlide() {
    this.counter++;
    if (this.counter > this.slidersQuantity) this.counter = 0;
    this.block.style.transform = `translateX(${
      (-this.counter * (this.slideItemWith + 24)) / 16
    }rem)`;
    this.block.style.transition = "800ms";
    if (this.dots) this.showActiveDot(this.counter);
  }

  rollToStartList() {
    this.isLastSlide = this.slides[this.counter].hasAttribute("cloned");
    if (this.isLastSlide) {
      setTimeout(() => {
        this.block.style.transform = "translateX(0rem)";
        this.block.style.transition = "none";
      }, 750);
    }
  }

  rollSlidesInfinity() {
    this.rollToStartList();
    let timeoutId = setTimeout(
      () => {
        this.rollOneSlide();
        this.rollSlidesInfinity();
      },
      !this.isLastSlide
        ? this.counter !== 0
          ? this.delay
          : this.delay - 750
        : 800
    );
    this.timeoutId = timeoutId;
  }

  setListeners() {
    if (this.dots) {
      this.dots.forEach((item, index) => {
        item.addEventListener("click", () => {
          clearInterval(this.timeoutId);
          this.counter = index - this.slidesToShow;
          this.rollOneSlide();
          this.rollSlidesInfinity();
          this.showActiveDot(index);
        });
      });
    }

    if (this.btn) {
      this.btn.addEventListener("click", () => {
        clearInterval(this.timeoutId);
        this.rollOneSlide();
        this.btn.setAttribute("disabled", "");
        setTimeout(() => {
          this.btn.removeAttribute("disabled");
        }, 850);
        this.rollSlidesInfinity();
      });
    }
  }
}
