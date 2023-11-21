import { curry, go, map, forEach, reduce } from "./utils.js";

const split = curry((sep, texts) => map((text) => text.split(sep), texts));
const double = (splitedTexts) =>
  map((text) => [...text, ...text], splitedTexts);
const join = (sep, texts) => reduce((acc, cur) => `${acc}${sep}${cur}`, texts);

const texts = [
  "Yummy Tasty Delicious Useful Coding Yummy Yummmmy Yummmmmmmmmy yum",
  "Chicken Hamburger Pizza Salad Sushi Ramen Gimbab JJajangmyeon",
  "Let's Dive Into This Tutorial Take It Easy! Don't Worry",
  "Pure Moral Conscientious Meritorious Worthy Exemplary Upright ",
];
const slideSpeed = 1;
const scrollSpeed = 10;
const $pTags = document.querySelectorAll(".cover p");
const counts = Array(texts.length).fill(0);
const parsedText = go(
  texts,
  split(" "),
  double,
  map((doubledTextArr) => join("\u00A0\u00A0\u00A0\u00A0", doubledTextArr))
);
const initText = (elements, textArr) =>
  go(
    elements,
    forEach((element, index) => (element.innerText = textArr[0]))
  );

initText($pTags, parsedText);

const updateCounts = (counts, speed) =>
  forEach(
    (_, index) => (counts[index] += index % 2 !== 0 ? speed : -speed),
    counts
  );

const applySlide = (count, element) => {
  if (Math.abs(count) > Math.abs(element.scrollWidth / 2)) {
    element.style.transform = `translate3d(0, 0, 0)`;
    count = 0;
  }

  element.style.transform = `translate3d(${count}px, 0, 0)`;

  return count;
};

function inifiteSliding(speed = 1) {
  updateCounts(counts, speed);
  forEach(
    (count, index) => (counts[index] = applySlide(count, $pTags[index])),
    counts
  );
  window.requestAnimationFrame(() => inifiteSliding(speed));
}

const scrollHandler = (scrollSpeed) => updateCounts(counts, scrollSpeed);
inifiteSliding(slideSpeed);
window.addEventListener("scroll", () => scrollHandler(scrollSpeed));

// ! fontSize => clamp속성 정리하기!!! -> 개 좋음!! 뭔가 반응형 할 때 일일히 글씨의 크기를 지정 안 해주어도 될 것 같다.
