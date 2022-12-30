var navbar = document.querySelector(".navbar");
var navText = document.querySelector(".nav-text");
var navMenuBtn = document.querySelector(".nav-menu-btn");
window.onscroll = function () { shrinkNavbar(); };
var shrunkNavbar = false;
var navBarShrinkTimeout = false;
function shrinkNavbar() {
    if (navBarShrinkTimeout)
        return;
    (function callTimeout() {
        navBarShrinkTimeout = true;
        delay(200).then(function () { return navBarShrinkTimeout = false; });
    });
    var screenWidthPhone = {
        min: window.matchMedia("(min-width: 320px)"),
        max: window.matchMedia("(max-width: 430px)")
    };
    var scrollY = document.documentElement.scrollTop;
    if (screenWidthPhone.min.matches && screenWidthPhone.max.matches) {
        if (scrollY > 100) {
            if (shrunkNavbar)
                return;
            manipulateNavDOM('0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.1)', '3.7rem', '1.6rem', '2rem', true);
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
        if (scrollY > 100) {
            if (shrunkNavbar)
                return;
            manipulateNavDOM('0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.1)', '3.7rem', '1.6rem', '2rem', true);
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
        if (scrollY > 100) {
            if (shrunkNavbar)
                return;
            manipulateNavDOM('0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.1)', '3.7rem', '1.6rem', '2rem', true);
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
    function manipulateNavDOM(bShadow, height, tFont, bFont, shrunkState) {
        navbar.style.boxShadow = bShadow;
        navbar.style.height = height;
        navText.style.fontSize = tFont;
        navMenuBtn.style.fontSize = bFont;
        shrunkNavbar = shrunkState;
    }
}
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
//# sourceMappingURL=domInteraction.js.map