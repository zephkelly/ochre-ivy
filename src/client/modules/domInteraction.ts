const navbar: HTMLElement = document.querySelector(".navbar") as HTMLElement;
const navText: HTMLElement = document.querySelector(".nav-text") as HTMLElement;
const navMenuBtn: HTMLElement= document.querySelector(".nav-menu-btn") as HTMLElement;

window.onscroll = function () { shrinkNavbar() };

let shrunkNavbar: boolean = false;
let navBarShrinkTimeout: boolean = false;

function shrinkNavbar() {
  if (navBarShrinkTimeout) return;

  (function callTimeout() {
    navBarShrinkTimeout = true;
    delay(200).then(() => navBarShrinkTimeout = false);
  });

  //mobile navbar
  let screenWidthPhone = {
    min: window.matchMedia("(min-width: 320px)"),
    max: window.matchMedia("(max-width: 430px)")
  }

  let scrollY: number = document.documentElement.scrollTop;

  if (screenWidthPhone.min.matches && screenWidthPhone.max.matches)
  {
    if (scrollY > 100) {
      if (shrunkNavbar) return;
      
      manipulateNavDOM(
        '0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.1)',
        '3.7rem', '1.6rem', '2rem', true
      );
    }
    else {
      if (!shrunkNavbar) return;
      manipulateNavDOM('', '', '', '', false);
    }

    console.log("phone screen");
    return;
  }

  //Tablet small
  let screenWidthTabletSmall = {
    min: window.matchMedia("(min-width: 431px)"),
    max: window.matchMedia("(max-width: 767px)")
  }

  if (screenWidthTabletSmall.min.matches && screenWidthTabletSmall.max.matches)
  {
    if (scrollY > 100) {
      if (shrunkNavbar) return;
      manipulateNavDOM(
        '0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.1)',
        '3.7rem', '1.6rem', '2rem', true
      );
    }
    else {
      if (!shrunkNavbar) return;
      manipulateNavDOM('', '', '', '', false);
    }

    console.log("tablet small");
    return;
  }

  //Tablet medium
  let screenWidthTabletMedium = {
    min: window.matchMedia("(min-width: 768px)"),
    max: window.matchMedia("(max-width: 1024px)")
  }

  if (screenWidthTabletMedium.min.matches && screenWidthTabletMedium.max.matches)
  {
    if (scrollY > 100) {
      if (shrunkNavbar) return;
      manipulateNavDOM(
        '0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.1)',
        '3.7rem', '1.6rem', '2rem', true
      );
    }
    else {
      if (!shrunkNavbar) return;
      manipulateNavDOM('', '', '', '', false);
    }

    console.log("tablet medium");
    return
  }

  let screenWidthTabletLarge = {
    min: window.matchMedia("(min-width: 1025px)"),
    max: window.matchMedia("(min-width: 1280px)")
  }

  function manipulateNavDOM(bShadow: string, height: string, tFont: string, bFont: string, shrunkState: boolean) {
    navbar.style.boxShadow = bShadow;
    navbar.style.height = height;
    navText.style.fontSize = tFont;
    navMenuBtn.style.fontSize = bFont;
    shrunkNavbar = shrunkState;
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}