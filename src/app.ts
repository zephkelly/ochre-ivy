//dominteraction.ts
// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
const navbar = document.querySelector(".navbar") as HTMLElement;
const navText = document.querySelector(".nav-text") as HTMLElement;

window.onscroll = function () { shrinkNavbar() };

function shrinkNavbar() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    navText.style.fontSize = "1.4rem";
    navbar.style.paddingTop = "0rem";
  } else {
    navText.style.fontSize = '1.8rem';
    navbar.style.paddingTop = "2rem";
  }
}
//--------------------------------------------------------------


