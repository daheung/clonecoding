const headerNavbarOverlayConatiner = document.querySelector(".header__navbar-overlay-container");
const headerNavbarOverlayInnerConatiner = document.querySelector(".header__navbar-overlay-innercontainer")
const exploreContainer = document.querySelector(".header__navbar-explore-innercontainer");
const exploreItems = Array.from(
  exploreContainer.querySelectorAll(".header__navbar-explore-content")
);

const targetItems = Array.from(
  document.querySelectorAll(".header__navbar-target")
);

const targetMap = new Map();

for (const t of targetItems) {
  const iterClass = Array.from(t.classList).find(c => /^iter-\d+$/.test(c));
  if (!iterClass) continue;
  const iter = iterClass.match(/^iter-(\d+)$/)[1];
  targetMap.set(iter, t);
}

function getIterNumber(el) {
  if (el.dataset && el.dataset.iter) return el.dataset.iter;

  const iterClass = Array.from(el.classList).find(c => /^iter-\d+$/.test(c));
  if (!iterClass) return null;

  return iterClass.match(/^iter-(\d+)$/)[1];
}

function hideAllTargets() {
}

for (const item of exploreItems) {
  const iter = getIterNumber(item);
  const target = iter ? targetMap.get(iter) : null;

  item.addEventListener("mouseenter", () => {
    for (const other of targetItems) {
      other.classList.add("disabled");
    }

    if (target) {
      target.classList.remove("disabled");
    }
  });
}


const headerMenuContainerEl = document.querySelector(".header__menu-container");
const targetMenuContentEl = headerMenuContainerEl.querySelector(".header__menu");
let outOfHeaderMenuContent = true;
let outOfHeaderNavContent = true;

targetMenuContentEl.addEventListener('mouseenter', async () => {
  // await new Promise(resolve => setTimeout(resolve, 100));
  outOfHeaderMenuContent = false;
  headerNavbarOverlayConatiner.classList.remove('disabled');
  console.log(`Header Menu Content: ${outOfHeaderMenuContent}`);
});

targetMenuContentEl.addEventListener('mouseleave', async () => {
  // await new Promise(resolve => setTimeout(resolve, 100));
  outOfHeaderMenuContent = true;
  if (outOfHeaderNavContent) {
    headerNavbarOverlayConatiner.classList.add('disabled');
  }
  console.log(`Header Menu Content: ${outOfHeaderMenuContent}`);
});

headerNavbarOverlayInnerConatiner.addEventListener('mouseenter', async () => {
  // await new Promise(resolve => setTimeout(resolve, 100));
  outOfHeaderNavContent = false;
  headerNavbarOverlayConatiner.classList.remove('disabled');
  console.log(`Header Nav Content: ${outOfHeaderNavContent}`);
});

headerNavbarOverlayInnerConatiner.addEventListener('mouseleave', async () => {
  // await new Promise(resolve => setTimeout(resolve, 100));
  outOfHeaderNavContent = true;
  if (outOfHeaderMenuContent) {
    headerNavbarOverlayConatiner.classList.add('disabled');
  }
  console.log(`Header Nav Content: ${outOfHeaderNavContent}`);
});