export const setCheckboxListener = () => {
  const checkbox = document.getElementById("burger-checkbox");
  const header = document.getElementById("header");

  const hideHeader = () => {
    document.body.style.overflow = "visible";
    header.style.animationName = "hideHeader";
    setTimeout(() => {
      header.style.display = "none";
    }, 450);
  };

  const showHeader = () => {
    document.body.style.overflow = "hidden";
    header.style.animationName = "showHeader";
    header.style.display = "flex";
  };
  checkbox.addEventListener("click", ({ target: { checked } }) => {
    checked ? showHeader() : hideHeader();
  });

  header.addEventListener("click", () => {
    if (checkbox.checked) {
      checkbox.checked = false;
      hideHeader();
    }
  });
};
