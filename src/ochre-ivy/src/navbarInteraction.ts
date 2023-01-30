import { delay } from './helperFunctions'
//-- ELEMENTS
//-----------------------------------------------------------------------------
const navbar: HTMLElement = document.querySelector(".navbar") as HTMLElement;
const navMenu: HTMLElement = document.querySelector(".nav-menu") as HTMLElement;

const navText: HTMLElement = document.querySelector(".nav-text") as HTMLElement;
const navTextSpacer: HTMLElement = document.querySelector(".nav-text-spacer") as HTMLElement;

const navMenuBtn: HTMLElement = document.querySelector(".nav-menu-btn") as HTMLElement;
const navBtnBg: HTMLElement = document.querySelector(".nav-btn-bg") as HTMLElement;

window.addEventListener('load', () => {
  shrinkNavbar();

  if (screen.width <= 982) {
    navMenu.style.display = 'none';
    desktopNavbar = false;
    console.log('Desktop navbar: ' + desktopNavbar)
  }
});

// -- Toggling navmenu/btn on click
let navMenuBtnClicked: boolean = false;
navMenuBtn.addEventListener('click', () => {
  navMenuBtnClicked = !navMenuBtnClicked;
  navMenuBtnToggle();
});


let desktopNavbar: boolean = true;
window.addEventListener("resize", () => {
  if (navMenuBtnClicked == true) {
    navMenuBtnClicked = false;
    navMenuBtnToggle();
  }
  
  if (screen.width <= 982) {
    navMenu.style.display = 'none';
  } else {
    navMenu.style.display = '';
  }
});

function navMenuBtnToggle() {
  if (navMenuBtnClicked) {
    navMenu.style.display = 'block';
    navMenu.style.boxShadow = '0rem 2rem 2rem 0rem rgba(0, 0, 0, 0.15)';
    navMenu.style.opacity = '1';

    navBtnBg.style.backgroundColor = 'white';
    navBtnBg.style.boxShadow = '0rem -0.7rem 1.5rem 0rem rgba(0, 0, 0, 0.2)';

  } else {
    navMenu.style.opacity = '0';
    navMenu.style.boxShadow = '';

    navBtnBg.style.backgroundColor = 'transparent';
    navBtnBg.style.boxShadow = '';
  
    delay(150).then(() => {
      navMenu.style.display = '';
      navMenu.style.opacity = '';
    });
  }
}

// -- Shrinking navbar on scroll
let shrunkNavbar: boolean = false;

let scrollY = 0;
export function shrinkNavbar() {
  delay(100)
    .then(() => scrollY = document.documentElement.scrollTop)
    .then(() => {
      if (scrollY > 20) {
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
          navbar.style.backgroundColor = 'white';
          navText.style.marginBottom = '0';
          navTextSpacer.style.opacity = '0';
          navTextSpacer.style.bottom = '-0.5rem';
          navTextSpacer.style.left = '0.5rem';
          navTextSpacer.style.height = '0';

          navMenuBtn.style.top = '0.5rem';

          navMenu.style.top = '4.5rem';
          navMenu.style.borderRadius = '0 0 0.5rem 0.5rem';

        } else {
          navbar.style.backgroundColor = '#f8c6b7';
          navText.style.marginBottom = '';
          navTextSpacer.style.opacity = '';
          navTextSpacer.style.bottom = '';
          navTextSpacer.style.left = '';
          navTextSpacer.style.height = '';

          navMenuBtn.style.top = '';

          navMenu.style.top = '7rem';
          navMenu.style.borderRadius = '';
        }
      }
    });
}