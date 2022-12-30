//dominteraction.ts
// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
const navbar = document.querySelector(".navbar") as HTMLElement;
const navText = document.querySelector(".nav-text") as HTMLElement;
const navMenuBtn = document.querySelector(".nav-menu-btn").firstElementChild as HTMLElement;

window.onscroll = function () { shrinkNavbar() };

let shrunkNavbar = false;

function shrinkNavbar() {
  let scrollY = document.documentElement.scrollTop;

  if (scrollY > 80) {
    if (shrunkNavbar) return;

    navText.style.fontSize = "1.4rem";
    navbar.style.paddingTop = "0rem";
    navMenuBtn.style.fontSize = "1.8rem";

    shrunkNavbar = true;
  } else {
    if (shrunkNavbar == false) return;

    navText.style.fontSize = '1.8rem';
    navbar.style.paddingTop = "2rem";
    navMenuBtn.style.fontSize = "2.2rem";

    shrunkNavbar = false;
  }
}
//--------------------------------------------------------------


