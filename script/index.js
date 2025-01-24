// handle slider
const MAX_VALUE = 200000;

let step = 10;

function updateStep() {
  const width = window.innerWidth;
  if (width < 990) {
    step = 8;
  } else {
    step = 10;
  }
  if (width < 525) {
    step = 4;
  } else if (width < 768) {
    step = 5;
  }
  sliderEl4.max = MAX_VALUE + MAX_VALUE / step;
  renderNode();
}
const tick1 = document.querySelector(".tick-1");
const tick2 = document.querySelector(".tick-2");
function renderNode() {
  // render span inside tick 1
  tick1.innerHTML = "";

  const firstSpanTick1 = document.createElement("span");
  firstSpanTick1.className = "slidertick opacity-0";
  tick1.appendChild(firstSpanTick1);

  for (let i = 0; i < step; i++) {
    const span = document.createElement("span");
    span.className = "slidertick";
    tick1.appendChild(span);
  }

  const lastSpanTick1 = document.createElement("span");
  lastSpanTick1.className = "slidertick position-relative";
  lastSpanTick1.style.left = "5px";
  tick1.appendChild(lastSpanTick1);

  // render span inside tick 2
  tick2.innerHTML = "";

  const firstSpanTick2 = document.createElement("span");
  firstSpanTick2.className = "slidertick";
  firstSpanTick2.dataset.value = "0";
  tick2.appendChild(firstSpanTick2);

  for (let i = 0; i < step; i++) {
    const span = document.createElement("span");
    span.className = "slidertick";
    const divDataSet = document.createElement("div");
    const value = ((i + 1) * MAX_VALUE) / step;
    divDataSet.dataset.value = value;
    divDataSet.innerText = formatCurrency(value);
    span.appendChild(divDataSet);
    tick2.appendChild(span);
  }

  const lastSpanTick2 = document.createElement("span");
  lastSpanTick2.className = "slidertick";
  const divDataSet = document.createElement("div");
  divDataSet.dataset.value = sliderEl4.max;
  divDataSet.innerText = "Talk to sales";
  lastSpanTick2.appendChild(divDataSet);
  tick2.appendChild(lastSpanTick2);

  addEventSliderTicks2();
}

const sliderEl4 = document.querySelector("#range4");
const sliderValue4 = document.querySelector(".value4");

const inputColor = document.querySelector(".input-color");

const labelValueSlide = document.querySelector(
  ".estimation-range .off-white-btn"
);
sliderEl4.addEventListener("input", (event) => {
  let indexValue = event.target.value;
  if (indexValue > MAX_VALUE) {
    indexValue = sliderEl4.max;
  }
  hideTickNode(indexValue);
});
function addEventSliderTicks2() {
  const sliderTicks2 = document.querySelectorAll(".tick-2 span");

  sliderTicks2.forEach((tick) => {
    tick.addEventListener("click", (event) => {
      const indexValue = event.target.dataset.value;
      hideTickNode(indexValue);
    });
  });
}
function hideTickNode(indexValue) {
  indexValue = Math.max(10000, +indexValue);
  const progress = (indexValue / sliderEl4.max) * 100;
  sliderEl4.value = indexValue;
  updatePrice(indexValue);
  sliderEl4.style.background = ` linear-gradient(90deg, #BB1EF2 0%, #3D5DFF ${progress}%)`;
  inputColor.style.width = `calc(${100 - progress}%)`;
  const sliderTicks1 = document.querySelectorAll(".tick-1 span");
  sliderTicks1.forEach((tick, index) => {
    tick.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    const stepShow = MAX_VALUE / step;
    const shouldHideNode =
      Math.abs(index * stepShow - indexValue) < MAX_VALUE / 100;
    if (shouldHideNode) {
      tick.style.backgroundColor = "unset";
    }
  });
}

const starterPrice = document.querySelector("#starter-price");
const corePrice = document.querySelector("#core-price");
const BASE_STARTER_PRICE = 2400;
const BASE_CORE_PRICE = 4100;
const monthBilleds = document.querySelectorAll(".month-billed");
const deliver = document.querySelector("#deliver");

function updatePrice(indexValue) {
  if (indexValue > MAX_VALUE) {
    starterPrice.textContent = "Custom";
    corePrice.textContent = "Custom";
    deliver.textContent = "Custom";

    monthBilleds.forEach((monthBilled) => {
      monthBilled.classList.add("d-none");
    });
  } else {
    const starterPriceValue = BASE_STARTER_PRICE + +indexValue;
    const corePriceValue = BASE_CORE_PRICE + +indexValue;
    starterPrice.textContent = "$" + formatCurrency(starterPriceValue);
    corePrice.textContent = "$" + formatCurrency(corePriceValue);
    deliver.textContent = formatCurrency(indexValue);

    monthBilleds.forEach((monthBilled) => {
      monthBilled.classList.remove("d-none");
    });
  }
}
hideTickNode(10000);

function formatCurrency(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// end handle slider

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

const col3 = document.getElementById("col-3");
const col3Overlay = document.querySelector(".col-3-overlay");

setEqualHeight();
updateStep();
updateColOverlay();
window.addEventListener("resize", () => {
  setEqualHeight();
  updateStep();
  updateColOverlay();
  //update step base on width
});

function updateColOverlay() {
  const rect = col3.getBoundingClientRect();
  col3Overlay.style.width = rect.width + "px";
  col3Overlay.style.left = rect.left + "px";
}
