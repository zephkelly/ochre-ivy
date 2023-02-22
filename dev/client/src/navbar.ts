import { delay } from './helperFunctions'
//-- ELEMENTS
//-----------------------------------------------------------------------------
const navbar: HTMLElement = document.querySelector(".navbar") as HTMLElement;
const navMenu: HTMLElement = document.querySelector(".nav-menu") as HTMLElement;

const navText: HTMLElement = document.querySelector(".nav-text") as HTMLElement;
const navTextSpacer: HTMLElement = document.querySelector(".nav-text-spacer") as HTMLElement;
let spacerPresent: boolean = false;

let navbarContainer: HTMLElement = document.querySelector(".navbar .navbar-container") as HTMLElement;
let navMenuBtn: HTMLElement = document.querySelector(".nav-menu-btn") as HTMLElement;
let navMenuBtnPath: HTMLElement = document.querySelector(".nav-menu-btn-path") as HTMLElement;
let navBtnBg: HTMLElement = document.querySelector(".nav-btn-bg") as HTMLElement;

const navList: HTMLElement = document.querySelector(".navbar .nav-list") as HTMLElement;

const notification: HTMLElement = document.getElementById("notification") as HTMLElement;
let notificationPresent: boolean = false;


// let mobileMode: boolean = false;
window.addEventListener('load', () => {
  if (navTextSpacer) {
    spacerPresent = true;
  }

  navbarContainer = document.querySelector(".navbar .navbar-container") as HTMLElement;
  navMenuBtn = document.querySelector(".nav-menu-btn") as HTMLElement;
  navMenuBtnPath = document.querySelector(".nav-menu-btn-path") as HTMLElement;
  navBtnBg = document.querySelector(".nav-btn-bg") as HTMLElement;

  shrinkNavbar();

  navbar.style.transition = 'backgroundColor 0.3 ease-in-out, height 0.3s ease-in-out';

  if (screen.width <= 982) {
    navMenu.style.display = 'none';
    // mobileMode = true;
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
    // mobileMode = true;
  } else {
    navMenu.style.display = '';
    // mobileMode = false;
  }
});

// -- Toggling navmenu/btn on click
let navMenuBtnClicked: boolean = false;
navbarContainer.addEventListener('click', (e) => {
  if (e.target == null) return;

  const child: HTMLElement =  e.target as HTMLElement;

  if (child == null) return;

  if (child == navMenuBtn || child == navBtnBg || child == navMenuBtnPath) {
    navMenuBtnClicked = !navMenuBtnClicked;
    navMenuBtnToggle();
  }
});

document.addEventListener('click', (e) => { checkNavMenuDisable(e) });
document.addEventListener('scroll', (e) => { checkNavMenuDisable(e) });

function checkNavMenuDisable(e: any = null) {
  if (navMenuBtnClicked) {
    if (e != null) {
      if (e.target != navMenu && e.target != navMenuBtn && e.target != navBtnBg && e.target != navList && e.target != navMenuBtnPath) {
        navMenuBtnClicked = false;
        navMenuBtnToggle();
      }
    }
    else {
      navMenuBtnClicked = false;
      navMenuBtnToggle();
    }
  }
}

function navMenuBtnToggle() {
  if (navMenuBtnClicked) {
    navMenu.style.display = 'block';
    navMenu.style.boxShadow = '0rem 2rem 2rem 0rem rgba(0, 0, 0, 0.15)';
    navMenu.style.opacity = '1';

    navBtnBg.style.backgroundColor = 'white';
    navBtnBg.style.boxShadow = 'rgba(0, 0, 0, 0.15) 0rem -3rem 3rem 0rem';

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
        spacerPresent = navTextSpacer.style.display === 'none' ? false : true;

        manipulateNavDOM(
          '0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.05)',
          '-1.8rem', '1.4rem', '1.8rem', true
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

      function manipulateNavDOM(bShadow: string, top: string, navTextFont: string, buttonWidth: string, shrunkState: boolean) {
        navbar.style.boxShadow = bShadow;
        navbar.style.top = top;
        navText.style.fontSize = navTextFont;
        navMenuBtn.style.width = buttonWidth;
        shrunkNavbar = shrunkState;

        if (shrunkNavbar) {
          navbar.style.backgroundColor = 'white';
          navText.style.marginBottom = '0';
          
          navMenuBtn.style.top = '0.5rem';
          navMenu.style.top = '5.5rem';
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
