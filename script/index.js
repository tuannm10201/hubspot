const sliderEl4 = document.querySelector("#range4");
const sliderValue4 = document.querySelector(".value4");

const sliderTicks2 = document.querySelectorAll(".tick-2 span");
const sliderTicks1 = document.querySelectorAll(".tick-1 span");

const labelValueSlide = document.querySelector(
  ".estimation-range .off-white-btn"
);
sliderEl4.addEventListener("input", (event) => {
  const indexValue = event.target.value;
  hideTickNode(indexValue);
});

sliderTicks2.forEach((tick) => {
  tick.addEventListener("click", (event) => {
    const indexValue = event.target.dataset.value;

    hideTickNode(indexValue);
  });
});

function hideTickNode(indexValue) {
  const progress = (indexValue / sliderEl4.max) * 100;
  sliderEl4.value = indexValue;
  //   if (indexValue != 12) {
  //     labelValueSlide.textContent = formatCurrency(indexValue * 10000);
  //   } else {
  //     labelValueSlide.textContent = "talk to sales";
  //   }
  sliderEl4.style.background = ` linear-gradient(90deg, #BB1EF2 0%, #3D5DFF ${progress}%)`;

  sliderTicks1.forEach((tick, index) => {
    tick.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    if (index === +indexValue) {
      tick.style.backgroundColor = "unset";
    }
  });
}

function formatCurrency(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const header = document.querySelector("header");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop <= 40) {
    header.style.backgroundColor = "transparent";
    return;
  }
  header.style.backgroundColor = "#16144f";
  if (scrollTop > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    header.classList.add("hidden");
  } else {
    // Scrolling up
    header.classList.remove("hidden");
  }

  lastScrollTop = scrollTop;
});
