const changeLight = (element, status) => {
  if (status === true) {
    element.classList.add("active");
    return;
  }

  element.classList.remove("active");
};

const changeColorIcon = (element, color) => {
  element.style.fill = color;
};

export { changeLight, changeColorIcon };
