import './style.css'
import { shrinkNavbar } from './navbar'

window.addEventListener("scroll", () => {
  shrinkNavbar();
});