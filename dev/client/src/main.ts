import './style.css'
import { shrinkNavbar } from './navbar'
import { formatString, formatDate } from './helperFunctions';

const recipePosts: NodeListOf<HTMLElement> = document.querySelectorAll('#recipes-box .recipe-post');

window.addEventListener("scroll", () => {
  shrinkNavbar();
});

window.addEventListener("load", () => {
  hideExtraBlogs();
});

window.addEventListener("resize", () => {
  hideExtraBlogs();
});

const hideExtraBlogs_current = { width: 200 };
function hideExtraBlogs() {
  if (window.innerWidth < 630) {
    if (hideExtraBlogs_current.width === 630) return;
    hideExtraBlogs_current.width = 630;

    for (let i = 3; i < recipePosts.length; i++) {
      recipePosts[i].classList.add('hidden');
    }
  }
  else if (window.innerWidth < 980) {
    if (hideExtraBlogs_current.width === 980) return;
    hideExtraBlogs_current.width = 980;

    for (let i = 4; i < recipePosts.length; i++) {
      recipePosts[i].classList.add('hidden');
    }
  }
  else {
    if (hideExtraBlogs_current.width === 1000) return;
    hideExtraBlogs_current.width = 1000;

    for (let i = 0; i < recipePosts.length; i++) {
      recipePosts[i].classList.remove('hidden');
    }
  }
}

const blogPost: HTMLElement = document.querySelector('.blog-desc') as HTMLElement;

if (blogPost != null)
{
  const blogPostText: string = blogPost.innerHTML;
  blogPost.innerHTML = formatString(blogPostText, 150);
}

const recipesDescriptions: NodeListOf<HTMLElement> = document.querySelectorAll('.recipe-desc');

if (recipesDescriptions != null) {
  for (let i = 0; i < recipesDescriptions.length; i++) {
    const recipeText: string = recipesDescriptions[i].innerHTML;
    recipesDescriptions[i].innerHTML = formatString(recipeText, 250);
  }
}

const blogDates: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-date');

if (blogDates != null) {
  for (let i = 0; i < blogDates.length; i++) {
    const date: string = blogDates[i].innerHTML;
    blogDates[i].innerHTML = formatDate(date, true);
  }
}

export { };