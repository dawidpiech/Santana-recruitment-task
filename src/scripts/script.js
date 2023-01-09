const hamburger = document.querySelector(".nav__hamburger");
const navList = document.querySelector(".nav__wrapper");

hamburger.addEventListener("click", openMenu);

function openMenu() {
  hamburger.classList.toggle("is-active");
  navList.classList.toggle("open");
  navList.classList.toggle("closed");
}
