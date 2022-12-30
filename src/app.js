var navbar = document.querySelector(".navbar");
var navText = document.querySelector(".nav-text");
var navMenuBtn = document.querySelector(".nav-menu-btn").firstElementChild;
window.onscroll = function () { shrinkNavbar(); };
var shrunkNavbar = false;
function shrinkNavbar() {
    var scrollY = document.documentElement.scrollTop;
    if (scrollY > 80) {
        if (shrunkNavbar)
            return;
        navText.style.fontSize = "1.4rem";
        navbar.style.paddingTop = "0rem";
        navMenuBtn.style.fontSize = "1.8rem";
        shrunkNavbar = true;
    }
    else {
        if (shrunkNavbar == false)
            return;
        navText.style.fontSize = '1.8rem';
        navbar.style.paddingTop = "2rem";
        navMenuBtn.style.fontSize = "2.2rem";
        shrunkNavbar = false;
    }
    console.log("scrolling");
}
//# sourceMappingURL=app.js.map