// handle slider
let isFirstRender = true;

const MAX_VALUE = 200000;
const INIT_STEP = 11;
const INIT_SUB_STEP = [2, 5, 5];
let step = INIT_STEP;
let subStep = INIT_SUB_STEP;

const getUnitStep = () => MAX_VALUE / step;

function updateStep() {
  const width = window.innerWidth;
  let newStep = step;
  if (width < 990) {
    newStep = 8;
    subStep = [5, 5, 5];
  } else {
    newStep = INIT_STEP;
    subStep = INIT_SUB_STEP;
  }
  if (width < 525) {
    newStep = 4;
    subStep = [5, 6, 8];
  } else if (width < 768) {
    newStep = 5;
    subStep = [5, 5, 8];
  }
  if (isFirstRender) {
    isFirstRender = false;
    step = newStep;
    renderNode();
    tickNode(getUnitStep());
  } else if (step !== newStep) {
    step = newStep;
    renderNode();
  }
}

const tick1 = document.querySelector(".tick-1");
const tick2 = document.querySelector(".tick-2");

function renderNode() {
  sliderEl4.max = MAX_VALUE + getUnitStep();
  renderValueNode();
  renderTextNode();
}

function renderValueNode() {
  // render span inside tick 1 - render node value
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
}

function renderTextNode() {
  // render span inside tick 2 - render node text display
  tick2.innerHTML = "";

  const firstSpanTick2 = document.createElement("span");
  firstSpanTick2.className = "slidertick";
  firstSpanTick2.dataset.value = "0";
  tick2.appendChild(firstSpanTick2);

  const subStepTotal = subStep.reduce((prev, curr) => prev + curr, 0);
  const leftStep = (MAX_VALUE - subStepTotal * 10000) / 10000;
  let valueDisplay = 0;
  for (let i = 0; i < step; i++) {
    const span = document.createElement("span");
    span.className = "slidertick";
    const divDataSet = document.createElement("div");

    if (i < leftStep) {
      valueDisplay += 10000;
    } else {
      const rightStepAcc = subStep[i - step + subStep.length];
      valueDisplay += rightStepAcc * 10000;
    }
    divDataSet.innerText = formatCurrency(valueDisplay);

    const value = ((i + 1) * MAX_VALUE) / step;
    divDataSet.dataset.value = value;

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
  tickNode(indexValue);
});
function addEventSliderTicks2() {
  const sliderTicks2 = document.querySelectorAll(".tick-2 span");

  sliderTicks2.forEach((tick) => {
    tick.addEventListener("click", (event) => {
      const indexValue = event.target.dataset.value;
      tickNode(indexValue);
    });
  });
}
function tickNode(indexValue) {
  indexValue = Math.max(getUnitStep(), +indexValue);
  const progress = (indexValue / sliderEl4.max) * 100;
  sliderEl4.value = indexValue;
  updatePrice(indexValue);
  sliderEl4.style.background = ` linear-gradient(90deg, #BB1EF2 0%, #3D5DFF ${progress}%)`;
  inputColor.style.width = `calc(${100 - progress}%)`;
  const sliderTicks1 = document.querySelectorAll(".tick-1 span");
  sliderTicks1.forEach((tick, index) => {
    tick.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    const shouldHideNode =
      Math.abs(index * getUnitStep() - indexValue) < MAX_VALUE / 100;
    if (shouldHideNode) {
      tick.style.backgroundColor = "unset";
    }
  });
}

const starterPrice = document.querySelector("#starter-price");
const corePrice = document.querySelector("#core-price");
const compareStarterPrice = document.querySelector("#compare-starter-price");
const compareCorePrice = document.querySelector("#compare-core-price");
const BASE_STARTER_PRICE = 2400;
const BASE_CORE_PRICE = 4100;
const monthBilleds = document.querySelectorAll(".month-billed");
const deliver = document.querySelector("#deliver");

function updatePrice(indexValue) {
  if (indexValue > MAX_VALUE) {
    monthBilleds.forEach((monthBilled) => {
      monthBilled.classList.add("d-none");
    });

    starterPrice.textContent = "Custom";
    corePrice.textContent = "Custom";
    deliver.textContent = "Custom";
    compareStarterPrice.textContent = "Custom";
    compareCorePrice.textContent = "Custom";
  } else {
    monthBilleds.forEach((monthBilled) => {
      monthBilled.classList.remove("d-none");
    });
    const finalValue = calculatedValue(indexValue);
    const starterPriceValue = BASE_STARTER_PRICE + finalValue;
    const corePriceValue = BASE_CORE_PRICE + finalValue;
    starterPrice.textContent = "$" + formatCurrency(starterPriceValue);
    corePrice.textContent = "$" + formatCurrency(corePriceValue);
    compareStarterPrice.textContent =
      "$" + formatCurrency(starterPriceValue) + " /mo";
    compareCorePrice.textContent =
      "$" + formatCurrency(corePriceValue) + " /mo";
    deliver.textContent = formatCurrency(finalValue);
  }
}

function calculatedValue(value) {
  let result = (step + 1) / (sliderEl4.max / value);
  const subStepIndex = subStep.length - step + Math.floor(result);
  if (subStepIndex > -1) {
    result = accumulateValue(result);
  }
  return Math.round(result * 10000);
}

function accumulateValue(value) {
  const fillStep = getFillSubStep();
  let result = 0;
  const integerPart = Math.floor(value);
  const fractionalPart = value - integerPart;
  const leftPartLength = step - subStep.length;

  for (let i = 0; i < leftPartLength; i++) {
    result += fillStep[i];
  }

  for (let i = leftPartLength; i < integerPart; i++) {
    result += fillStep[i];
  }

  if (fractionalPart > 0) {
    result += fractionalPart * fillStep[integerPart];
  }

  return result;
}

function getFillSubStep() {
  const result = new Array(step).fill(1);
  for (let i = 0; i < subStep.length; i++) {
    result[step - subStep.length + i] = subStep[i];
  }
  return result;
}

function formatCurrency(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// end handle slider

// handle layout
const header = document.querySelector("header");
const comparePlans = document.querySelector(".compare-plans");
let lastScrollTop = 0;
if (isComparePlansSticky()) {
  header.classList.add("hidden");
}
const topHeader = document.querySelector(".top-header");

function showHideHeader() {
  const scrollTop = +-topHeader.getBoundingClientRect().top;
  if (scrollTop <= 40 || isComparePlansSticky()) {
    header.style.backgroundColor = "transparent";
  } else {
    header.style.backgroundColor = "#16144f";

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      header.classList.add("hidden");
    } else {
      // Scrolling up
      header.classList.remove("hidden");
    }
  }
  lastScrollTop = scrollTop;
}
const body = document.querySelector("body");
body.addEventListener("scroll", () => {
  showHideHeader();
});
function updateRightHeader() {
  const scollBarWidth = body.offsetWidth - body.clientWidth;
  header.style.right = scollBarWidth + "px";
  header.style.paddingLeft = scollBarWidth + "px";
}

function isComparePlansSticky() {
  const comparePlansTop = comparePlans.getBoundingClientRect().top;
  const headerHeight = header.getBoundingClientRect().height;
  return comparePlansTop < headerHeight || comparePlansTop <= 0;
}

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

const col3 = document.getElementById("col-3");
const col3Overlay = document.querySelector(".col-3-overlay");
function updateColOverlay() {
  const rect = col3.getBoundingClientRect();
  col3Overlay.style.width = rect.width + "px";
  col3Overlay.style.left = rect.left + "px";
}

runOnMountOrResize();
window.addEventListener("resize", runOnMountOrResize);

function runOnMountOrResize() {
  setEqualHeight();
  updateStep();
  updateColOverlay();
  updateRightHeader();
}
