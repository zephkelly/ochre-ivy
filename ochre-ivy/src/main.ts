import './style.css'
import { setNavbarInitial } from './domInteraction'
import { shrinkNavbar } from './domInteraction'

window.addEventListener("load", () => {
  setNavbarInitial();
});

window.addEventListener("scroll", () => {
  shrinkNavbar();
});