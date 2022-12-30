//dominteraction.ts
// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
const navbar = document.querySelector(".navbar") as HTMLElement;
const navText = document.querySelector(".nav-text") as HTMLElement;
const navMenuBtn = document.querySelector(".nav-menu-btn") as HTMLElement;

window.onscroll = function () { shrinkNavbar() };

let shrunkNavbar = false;

function shrinkNavbar() {
  let scrollY = document.documentElement.scrollTop;

  if (scrollY > 80) {
    if (shrunkNavbar) return;
    navbar.style.height = "3.6rem";
    navbar.style.boxShadow = "0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.1)";
    navText.style.fontSize = "1.6rem";
    navMenuBtn.style.fontSize = "2rem";

    shrunkNavbar = true;
  } else {
    if (shrunkNavbar == false) return;
    navbar.style.height = '';
    navbar.style.boxShadow = ''
    navText.style.fontSize = '';
    navMenuBtn.style.fontSize = '';

    shrunkNavbar = false;
  }
}
//--------------------------------------------------------------