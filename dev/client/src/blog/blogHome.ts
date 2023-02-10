import { validateString, formatDate } from '../helperFunctions';

// Navigation menu
const blogNavHome = document.querySelector('.blog-nav-home');
const blogNavAll = document.querySelector('.blog-nav-all');

blogNavHome?.addEventListener('click', () => {
  blogNavHome.classList.add('active');
  blogNavAll?.classList.remove('active');
});

blogNavAll?.addEventListener('click', () => {
  blogNavAll.classList.add('active');
  blogNavHome?.classList.remove('active');
});

// Format dates
const blogCreatedDate: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-date') as NodeListOf<HTMLElement>;

for (let i = 0; i < blogCreatedDate.length; i++) {
  const blogCreatedDateText = blogCreatedDate[i].innerText;
  const date = formatDate(blogCreatedDateText, true);
  blogCreatedDate[i].innerText = date.toString();
}

// Format descriptions
const blogDescription: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-description') as NodeListOf<HTMLElement>;
const recipeDescription: NodeListOf<HTMLElement> = document.querySelectorAll('.recipe-description') as NodeListOf<HTMLElement>;

for (let i = 0; i < blogDescription.length; i++) {
  const blogDescriptionText = blogDescription[i].innerText;
  const description = validateString(blogDescriptionText, 400);
  blogDescription[i].innerText = description;
}

for (let i = 0; i < recipeDescription.length; i++) {
  const recipeDescriptionText = recipeDescription[i].innerText;
  const description = validateString(recipeDescriptionText, 250);
  recipeDescription[i].innerText = description;
}

// Carousel for featured blogs
const featuredBlogs: NodeListOf<HTMLElement> = document.querySelectorAll('.featured-blog') as NodeListOf<HTMLElement>;
const featuredBlogLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.featured-blog-link') as NodeListOf<HTMLElement>;

let interval = setInterval(showFeaturedBlog, 6500);

featuredBlogLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (link.classList.contains('active')) {
      return;
    }

    const linkIndex = Array.from(featuredBlogLinks).indexOf(link);

    if (linkIndex > featuredBlogs.length - 1) {
      return;
    }

    lastFeaturedBlog = currentFeaturedBlog;
    currentFeaturedBlog = linkIndex;
    
    featuredBlogLinks[lastFeaturedBlog].classList.remove('active');
    featuredBlogs[lastFeaturedBlog].style.opacity = '0';
    
    featuredBlogs[currentFeaturedBlog].style.display = 'flex';
    featuredBlogLinks[currentFeaturedBlog].classList.add('active');

    setTimeout(() => {
      featuredBlogs[lastFeaturedBlog].style.display = 'none';
    }, 500)

    setTimeout(() => {
      featuredBlogs[currentFeaturedBlog].style.opacity = '1';
    }, 5)

    clearInterval(interval);
    interval = setInterval(showFeaturedBlog, 10000);
  });
});

let lastFeaturedBlog = featuredBlogs.length - 1;
let currentFeaturedBlog = 0;

showFeaturedBlog();

function showFeaturedBlog() {
  lastFeaturedBlog = currentFeaturedBlog;

  featuredBlogLinks[lastFeaturedBlog].classList.remove('active');
  featuredBlogs[lastFeaturedBlog].style.opacity = '0';

  setTimeout(() => {
    featuredBlogs[lastFeaturedBlog].style.display = 'none';
  }, 500)
  
  currentFeaturedBlog = (currentFeaturedBlog + 1) % featuredBlogs.length;
  
  setTimeout(() => {
    featuredBlogs[currentFeaturedBlog].style.opacity = '1';
  }, 5)
  
  featuredBlogs[currentFeaturedBlog].style.display = 'flex';
  featuredBlogLinks[currentFeaturedBlog].classList.add('active');
}

export { };