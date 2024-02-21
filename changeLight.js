const changeLight = (element, status) => {
  if (status === true) {
    element.classList.add("active");
    return;
  }

  element.classList.remove("active");
};

export default changeLight;
