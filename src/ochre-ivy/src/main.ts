import './style.css'
import { shrinkNavbar } from './domInteraction'

window.addEventListener("scroll", () => {
  shrinkNavbar();
});