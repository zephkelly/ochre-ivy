import { delay } from './helperFunctions'
//-- ELEMENTS
//-----------------------------------------------------------------------------
const navbar: HTMLElement = document.querySelector(".navbar") as HTMLElement;
const navMenu: HTMLElement = document.querySelector(".nav-menu") as HTMLElement;

const navText: HTMLElement = document.querySelector(".nav-text") as HTMLElement;
const navTextSpacer: HTMLElement = document.querySelector(".nav-text-spacer") as HTMLElement;
let spacerPresent: boolean = false;

const navMenuBtn: HTMLElement = document.querySelector(".nav-menu-btn") as HTMLElement;
const navBtnBg: HTMLElement = document.querySelector(".nav-btn-bg") as HTMLElement;

const notification: HTMLElement = document.getElementById("notification") as HTMLElement;
let notificationPresent: boolean = false;

window.addEventListener('load', () => {
  if (navTextSpacer) {
    spacerPresent = true;
  }

  shrinkNavbar();

  if (screen.width <= 982) {
    navMenu.style.display = 'none';
  }

  if (notification) {    
    notificationPresent = true;
    notification.style.left = '2rem';

    delay(4500).then(() => {
      notification.style.opacity = '0';

      delay(300).then(() => {
        notification.remove();
      });
    });
  }
});

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

// -- Toggling navmenu/btn on click
let navMenuBtnClicked: boolean = false;
navMenuBtn.addEventListener('click', () => {
  navMenuBtnClicked = !navMenuBtnClicked;
  navMenuBtnToggle();
});

function navMenuBtnToggle() {
  if (navMenuBtnClicked) {
    navMenu.style.display = 'block';
    navMenu.style.boxShadow = '0rem 2rem 2rem 0rem rgba(0, 0, 0, 0.15)';
    navMenu.style.opacity = '1';

    navBtnBg.style.backgroundColor = 'white';
    navBtnBg.style.boxShadow = '0rem -1rem 1.3rem 0rem rgba(0, 0, 0, 0.2)';

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
          '2.8rem', '1.4rem', '1.8rem', true
        );

        if (notificationPresent) {
          notification.style.top = '5.5rem';
        }
      }
      else {
        if (!shrunkNavbar) return;
        manipulateNavDOM('', '', '', '', false);

        if (notificationPresent) {
          notification.style.top = '';
        }
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
          
          navMenuBtn.style.top = '0.5rem';
          navMenu.style.top = '4.2rem';
          navMenu.style.borderRadius = '0 0 0.5rem 0.5rem';
          
          if (!spacerPresent) return;
          navTextSpacer.style.opacity = '0';
          navTextSpacer.style.bottom = '-0.5rem';
          navTextSpacer.style.left = '0.5rem';
          navTextSpacer.style.height = '0';
        }
        else {
          navbar.style.backgroundColor = '#f8c6b7';
          navText.style.marginBottom = '';

          navMenuBtn.style.top = '';
          navMenu.style.top = '7rem';
          navMenu.style.borderRadius = '';

          if (!spacerPresent) return;
          navTextSpacer.style.opacity = '';
          navTextSpacer.style.bottom = '';
          navTextSpacer.style.left = '';
          navTextSpacer.style.height = '';
        }
      }
    });
}