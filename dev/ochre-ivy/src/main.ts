import './style.css'
import { shrinkNavbar } from './navbarInteraction'

window.addEventListener("scroll", () => {
  shrinkNavbar();
});