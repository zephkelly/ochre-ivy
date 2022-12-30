var navbar = document.querySelector(".navbar");
var navText = document.querySelector(".nav-text");
var navTextSpacer = document.querySelector(".nav-text-spacer");
var navMenuBtn = document.querySelector(".nav-menu-btn");
window.addEventListener("load", function () {
    setNavbarInitial();
});
window.addEventListener("scroll", function () {
    shrinkNavbar();
});
var shrunkNavbar = false;
var navBarShrinkTimeout = false;
function setNavbarInitial() {
    navbar.style.backgroundColor = '#f8c6b7';
}
function shrinkNavbar() {
    if (navBarShrinkTimeout)
        return;
    (function callTimeout() {
        navBarShrinkTimeout = true;
        delay(200).then(function () { return navBarShrinkTimeout = false; });
    });
    var scrollY = document.documentElement.scrollTop;
    var screenWidthPhone = {
        min: window.matchMedia("(min-width: 320px)"),
        max: window.matchMedia("(max-width: 430px)")
    };
    if (screenWidthPhone.min.matches && screenWidthPhone.max.matches) {
        if (scrollY > 60) {
            if (shrunkNavbar)
                return;
            manipulateNavDOM('0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.03)', '3rem', '1.4rem', '1.8rem', true);
        }
        else {
            if (!shrunkNavbar)
                return;
            manipulateNavDOM('', '', '', '', false);
        }
        console.log("phone screen");
        return;
    }
    var screenWidthTabletSmall = {
        min: window.matchMedia("(min-width: 431px)"),
        max: window.matchMedia("(max-width: 767px)")
    };
    if (screenWidthTabletSmall.min.matches && screenWidthTabletSmall.max.matches) {
        if (scrollY > 60) {
            if (shrunkNavbar)
                return;
            manipulateNavDOM('0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.03)', '3rem', '1.4rem', '1.8rem', true);
        }
        else {
            if (!shrunkNavbar)
                return;
            manipulateNavDOM('', '', '', '', false);
        }
        console.log("tablet small");
        return;
    }
    var screenWidthTabletMedium = {
        min: window.matchMedia("(min-width: 768px)"),
        max: window.matchMedia("(max-width: 1024px)")
    };
    if (screenWidthTabletMedium.min.matches && screenWidthTabletMedium.max.matches) {
        if (scrollY > 60) {
            if (shrunkNavbar)
                return;
            manipulateNavDOM('0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.03)', '3rem', '1.4rem', '1.8rem', true);
        }
        else {
            if (!shrunkNavbar)
                return;
            manipulateNavDOM('', '', '', '', false);
        }
        console.log("tablet medium");
        return;
    }
    var screenWidthTabletLarge = {
        min: window.matchMedia("(min-width: 1025px)"),
        max: window.matchMedia("(min-width: 1280px)")
    };
}
function manipulateNavDOM(bShadow, height, tFont, bFont, shrunkState) {
    navbar.style.boxShadow = bShadow;
    navbar.style.height = height;
    navText.style.fontSize = tFont;
    navMenuBtn.style.fontSize = bFont;
    shrunkNavbar = shrunkState;
    navbar.style.transition = "all 0.3s ease-out";
    if (shrunkNavbar) {
        navbar.style.backgroundColor = '';
        navText.style.marginBottom = '0';
        navTextSpacer.style.opacity = '0';
        navTextSpacer.style.bottom = '-0.5rem';
        navTextSpacer.style.left = '0.5rem';
        navTextSpacer.style.height = '0';
    }
    else {
        navbar.style.backgroundColor = '#f8c6b7';
        navText.style.marginBottom = '';
        navTextSpacer.style.opacity = '';
        navTextSpacer.style.bottom = '';
        navTextSpacer.style.left = '';
        navTextSpacer.style.height = '';
    }
}
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
//# sourceMappingURL=domInteraction.js.map