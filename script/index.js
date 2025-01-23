const sliderEl4 = document.querySelector("#range4");
const sliderValue4 = document.querySelector(".value4");

sliderEl4.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value;
  sliderValue4.textContent = tempSliderValue;
  const progress = (tempSliderValue / sliderEl4.max) * 100;
  sliderEl4.style.background = ` linear-gradient(90deg, #BB1EF2 0%, #3D5DFF ${progress}%)`;
});

const sliderTicks = document.querySelectorAll(".sliderticks span");
sliderTicks.forEach((tick) => {
  tick.addEventListener("click", (event) => {
    event.stopPropagation();
    sliderEl4.value = event.target.textContent;
    const dataValue = event.target.dataset.value;
    const progress = (dataValue / sliderEl4.max) * 100;
    sliderEl4.value = dataValue;

    sliderEl4.style.background = ` linear-gradient(90deg, #BB1EF2 0%, #3D5DFF ${progress}%)`;

    // const parentNode = event.target.parentNode;
    // if (parentNode?.classList.contains("slidertick")) {
    //   parentNode.style.backgroundColor = "unset";
    // }
  });
});
