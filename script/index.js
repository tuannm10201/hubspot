const sliderEl4 = document.querySelector("#range4");
const sliderValue4 = document.querySelector(".value4");

const sliderTicks2 = document.querySelectorAll(".tick-2 span");
const sliderTicks1 = document.querySelectorAll(".tick-1 span");

const inputColor = document.querySelector(".input-color");

const labelValueSlide = document.querySelector(
  ".estimation-range .off-white-btn"
);
sliderEl4.addEventListener("input", (event) => {
  const indexValue = event.target.value;
  hideTickNode(indexValue == 0 ? 1 : indexValue);
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
  updatePrice(indexValue);
  sliderEl4.style.background = ` linear-gradient(90deg, #BB1EF2 0%, #3D5DFF ${progress}%)`;
  inputColor.style.width = `calc(${100 - progress}%)`;
  sliderTicks1.forEach((tick, index) => {
    tick.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    if (index === +indexValue) {
      tick.style.backgroundColor = "unset";
    }
  });
}

const starterPrice = document.querySelector("#starter-price");
const corePrice = document.querySelector("#core-price");
const BASE_STARTER_PRICE = 2400;
const BASE_CORE_PRICE = 4100;
const monthBilleds = document.querySelectorAll(".month-billed");

function updatePrice(indexValue) {
  if (indexValue == 12) {
    starterPrice.textContent = "Custom";
    corePrice.textContent = "Custom";

    monthBilleds.forEach((monthBilled) => {
      monthBilled.classList.add("d-none");
    });
  } else {
    const starterPriceValue = BASE_STARTER_PRICE + +indexValue - 1;
    const corePriceValue = BASE_CORE_PRICE + +indexValue - 1;
    starterPrice.textContent = formatCurrency(starterPriceValue);
    corePrice.textContent = formatCurrency(corePriceValue);

    monthBilleds.forEach((monthBilled) => {
      monthBilled.classList.remove("d-none");
    });
  }
}
hideTickNode(1);

function formatCurrency(number) {
  return "$" + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    header.classList.add("hidden");
  } else {
    // Scrolling up
    header.classList.remove("hidden");
  }

  lastScrollTop = scrollTop;
});

const euqalHeight = document.querySelectorAll(".equal-height");

function setEqualHeight() {
  let maxHeight = 0;

  // Reset heights to calculate accurately
  euqalHeight.forEach((div) => {
    div.style.height = "auto";
  });

  // Find the maximum height
  euqalHeight.forEach((div) => {
    const height = div.offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
    }
  });

  // Apply the maximum height to all euqalHeight
  euqalHeight.forEach((div) => {
    div.style.height = `${maxHeight}px`;
  });
}

// Run when the window is ready and on resize
setEqualHeight();
window.addEventListener("resize", setEqualHeight);
