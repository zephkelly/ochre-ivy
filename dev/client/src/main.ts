import './style.css'
import { shrinkNavbar } from './navbar'
import { formatString, formatDate } from './helperFunctions';

window.addEventListener("scroll", () => {
  shrinkNavbar();
});

const blogPost: HTMLElement = document.querySelector('.blog-desc') as HTMLElement;

if (blogPost != null)
{
  const blogPostText: string = blogPost.innerHTML;
  blogPost.innerHTML = formatString(blogPostText, 150);
}

const blogDates: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-date');

if (blogDates != null) {
  for (let i = 0; i < blogDates.length; i++) {
    const date: string = blogDates[i].innerHTML;
    blogDates[i].innerHTML = formatDate(date, true);
  }
}

export { };