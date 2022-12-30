var navbar = document.querySelector(".navbar");
var navText = document.querySelector(".nav-text");
var navMenuBtn = document.querySelector(".nav-menu-btn");
window.onscroll = function () { shrinkNavbar(); };
var shrunkNavbar = false;
function shrinkNavbar() {
    var scrollY = document.documentElement.scrollTop;
    if (scrollY > 80) {
        if (shrunkNavbar)
            return;
        navbar.style.height = "3.6rem";
        navbar.style.boxShadow = "0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.1)";
        navText.style.fontSize = "1.6rem";
        navMenuBtn.style.fontSize = "2rem";
        shrunkNavbar = true;
    }
    else {
        if (shrunkNavbar == false)
            return;
        navbar.style.height = '';
        navbar.style.boxShadow = '';
        navText.style.fontSize = '';
        navMenuBtn.style.fontSize = '';
        shrunkNavbar = false;
    }
}
//# sourceMappingURL=app.js.map