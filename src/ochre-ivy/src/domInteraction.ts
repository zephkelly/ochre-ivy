import { delay } from './helperFunctions'
//-- ELEMENTS
//-----------------------------------------------------------------------------
const navbar: HTMLElement = document.querySelector(".navbar") as HTMLElement;
const navText: HTMLElement = document.querySelector(".nav-text") as HTMLElement;
const navTextSpacer: HTMLElement = document.querySelector(".nav-text-spacer") as HTMLElement;
const navMenuBtn: HTMLElement= document.querySelector(".nav-menu-btn") as HTMLElement;

// -- NAVIGATION BAR ----
// -- Shrinking navbar on scroll
let shrunkNavbar: boolean = false;
let navBarShrinkTimeout: boolean = false;

(function setNavbarInitial() {
  window.addEventListener('load', () => {
    navbar.style.backgroundColor = '#f8c6b7';
  });
})();

export function shrinkNavbar() {
  if (navBarShrinkTimeout) return;

  (function callTimeout() {
    navBarShrinkTimeout = true;
    delay(300).then(() => navBarShrinkTimeout = false);
  });

  let scrollY: number = document.documentElement.scrollTop;

  if (scrollY > 30) {
    if (shrunkNavbar) return;
        
    manipulateNavDOM(
      '0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.05)',
      '3rem', '1.4rem', '1.8rem', true
    );
  } else {
    if (!shrunkNavbar) return;
    manipulateNavDOM('', '', '', '', false);
  }

  function manipulateNavDOM(bShadow: string, height: string, tFont: string, bFont: string, shrunkState: boolean) {
    navbar.style.boxShadow = bShadow;
    navbar.style.height = height;
    navText.style.fontSize = tFont;
    navMenuBtn.style.fontSize = bFont;
    shrunkNavbar = shrunkState;

    //So we dont get a weird transition on load
    navbar.style.transition = "all 0.3s ease-out";

    if (shrunkNavbar) {
      navbar.style.backgroundColor = '';
      navText.style.marginBottom = '0';
      navTextSpacer.style.opacity = '0';
      navTextSpacer.style.bottom = '-0.5rem';
      navTextSpacer.style.left = '0.5rem';
      navTextSpacer.style.height = '0';

    } else {
      navbar.style.backgroundColor = '#f8c6b7';
      navText.style.marginBottom = '';
      navTextSpacer.style.opacity = '';
      navTextSpacer.style.bottom = '';
      navTextSpacer.style.left = '';
      navTextSpacer.style.height = '';
    }
  }
}