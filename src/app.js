var navbar = document.querySelector(".navbar");
var navText = document.querySelector(".nav-text");
window.onscroll = function () { shrinkNavbar(); };
function shrinkNavbar() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        navText.style.fontSize = "1.4rem";
        navbar.style.paddingTop = "0rem";
    }
    else {
        navText.style.fontSize = '1.8rem';
        navbar.style.paddingTop = "2rem";
    }
}
//# sourceMappingURL=app.js.map