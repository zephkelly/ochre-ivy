import './style.css'
import { shrinkNavbar } from './navbarInteraction'
import './validateSignup'

window.addEventListener("scroll", () => {
  shrinkNavbar();
});