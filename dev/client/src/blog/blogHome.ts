import { formatString, formatDate } from '../helperFunctions';

window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  const filter = urlParams.get('filter');

  if (page === 'all') {
    searchInputValue = searchInput.value;

    if (searchInputValue.length > 0) {
      makeRequest('&search=' + searchInputValue);
      removeActiveFilter();
    }

    if (filter !== null) {
      if (filter === 'all') {
        removeActiveFilter();
        setActiveFilter(allFilter);
      }
      else if (filter === 'recipe') {
        removeActiveFilter();
        setActiveFilter(recipesFilter);
      }
      else if (filter === 'newest') {
        removeActiveFilter();
        setActiveFilter(newestFilter);
      }
      else if (filter === 'oldest') {
        removeActiveFilter();
        setActiveFilter(oldestFilter);
      }
      else if (filter === 'alphabetical') {
        removeActiveFilter();
        setActiveFilter(azFilter);
      }
    }

    enableAllPage();
    return;
  }
});

// Navigation menu
const blogTitle: HTMLElement = document.querySelector('.blog-nav-title') as HTMLElement;
const blogNavHome: HTMLElement = document.querySelector('.blog-nav-home') as HTMLElement;
const blogNavAll: HTMLElement = document.querySelector('.blog-nav-all') as HTMLElement;

const navHeaderBgBox: HTMLElement = document.querySelector('.blogs-header-bgBox') as HTMLElement;

const blogHomePage: HTMLElement = document.querySelector('.faux-page-home') as HTMLElement;
const blogAllPage: HTMLElement = document.querySelector('.faux-page-all') as HTMLElement;

const footerContainer: HTMLElement = document.querySelector('#footer-container') as HTMLElement;

blogNavHome?.addEventListener('click', () => {
  enableHomePage();
});

blogNavAll?.addEventListener('click', () => {
  enableAllPage();
});

function enableHomePage() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete('page');
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

  //Reset all page
  searchInput.value = '';
  searchInputValue = '';
  makeRequest('');

  if (blogNavHome.classList.contains('active')) {
    return;
  }

  blogNavHome.classList.add('active');
  blogNavAll.classList.remove('active');

  navHeaderBgBox.style.transform = 'rotate(-8deg)';
  navHeaderBgBox.style.position = 'absolute';
  navHeaderBgBox.style.top = '';

  footerContainer.style.borderTop = 'none';
  blogTitle.style.paddingLeft = '';
  blogTitle.style.marginLeft = '';
  
  blogAllPage.classList.remove('active');
  
  setTimeout(() => {
    blogAllPage.style.display = 'none';
    blogHomePage.style.display = 'block';
    
    setTimeout(() => {
      blogHomePage.classList.add('active');
    }, 5);
  }, 150);
}

function enableAllPage() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('page', 'all');
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

   if (blogNavAll.classList.contains('active')) {
    return;
  }

  blogNavHome.classList.remove('active');
  blogNavAll.classList.add('active');

  navHeaderBgBox.style.transform = 'rotate(0deg)';
  navHeaderBgBox.style.position = 'fixed';
  navHeaderBgBox.style.top = '-10rem';

  footerContainer.style.borderTop = '2px solid var(--dark)';
  blogTitle.style.paddingLeft = '0rem';
  blogTitle.style.marginLeft = '-0.2rem';

  blogHomePage.classList.remove('active');
  
  setTimeout(() => {
    blogHomePage.style.display = 'none';
    blogAllPage.style.display = 'block';

    setTimeout(() => {
      blogAllPage.classList.add('active');
    }, 5);
  }, 150);
}

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
const allBlogsDescription: NodeListOf<HTMLElement> = document.querySelectorAll('.all-blog-description') as NodeListOf<HTMLElement>;

for (let i = 0; i < blogDescription.length; i++) {
  const blogDescriptionText = blogDescription[i].innerText;
  const description = formatString(blogDescriptionText, 400);
  blogDescription[i].innerText = description;
}

for (let i = 0; i < recipeDescription.length; i++) {
  const recipeDescriptionText = recipeDescription[i].innerText;
  const description = formatString(recipeDescriptionText, 250);
  recipeDescription[i].innerText = description;
}

for (let i = 0; i < allBlogsDescription.length; i++) {
  const allBlogsDescriptionText = allBlogsDescription[i].innerText;
  const description = formatString(allBlogsDescriptionText, 255);
  allBlogsDescription[i].innerText = description;
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

// Search bar for all page
const searchInput: HTMLInputElement = document.querySelector('.search-input') as HTMLInputElement;

let lastSearchInput: string = '';
let searchInputValue: string = '';

searchInput.addEventListener('focus', () => {
  searchInputValue = searchInput.value;

  if (searchInputValue === lastSearchInput) {
      return;
  }
  
  removeActiveFilter();
  makeRequest('&search=' + searchInputValue);
});

searchInput.addEventListener('keydown', (e) => {
  searchInputValue = searchInput.value;

  if (e.key === 'Enter') {
    if (searchInputValue === lastSearchInput) {
      return;
    }

    removeActiveFilter();
    makeRequest('&search=' + searchInputValue);
  }
});

searchInput.addEventListener('input', () => {
  searchInputValue = searchInput.value;

  if (searchInputValue == '') {
    makeRequest('');
    setActiveFilter(allFilter);
    return;
  }

  removeActiveFilter();
  makeRequest('&search=' + searchInputValue);
});

async function makeRequest(queryParam: string, page = 1) {
  const response = await fetch('/api/blog?display=true' + queryParam + '&page=' + page, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.status !== 200) {
    console.log('Error: ' + response.status);
    return;
  }

  const data = await response.json();

  if (page == 1) {
    clearAllBlogs();
  }

  appendBlogs(data);
}

// Filter blogs by category
const allFilter: HTMLElement = document.querySelector('.filter-button.all') as HTMLElement;
const recipesFilter: HTMLElement = document.querySelector('.filter-button.recipes') as HTMLElement;
const newestFilter: HTMLElement = document.querySelector('.filter-button.newest') as HTMLElement;
const oldestFilter: HTMLElement = document.querySelector('.filter-button.oldest') as HTMLElement;
const azFilter: HTMLElement = document.querySelector('.filter-button.az') as HTMLElement;

allFilter.addEventListener('click', () => {
  if (allFilter.classList.contains('active')) {
    return;
  }

  setActiveFilter(allFilter);
});

recipesFilter.addEventListener('click', () => {
  if (recipesFilter.classList.contains('active')) {
    return;
  }

  setActiveFilter(recipesFilter);
});

newestFilter.addEventListener('click', () => {
  if (newestFilter.classList.contains('active')) {
    return;
  }

  setActiveFilter(newestFilter);
});

oldestFilter.addEventListener('click', () => {
  if (oldestFilter.classList.contains('active')) {
    return;
  }

  setActiveFilter(oldestFilter);
});

azFilter.addEventListener('click', () => {
  if (azFilter.classList.contains('active')) {
    return;
  }
  
  setActiveFilter(azFilter);
});

function removeActiveFilter() {
  allFilter.classList.remove('active');
  recipesFilter.classList.remove('active');
  newestFilter.classList.remove('active');
  oldestFilter.classList.remove('active');
  azFilter.classList.remove('active');
}

function setActiveFilter(filter: HTMLElement) {
  removeActiveFilter();

  const urlParams = new URLSearchParams(window.location.search);
  let queryParam = '';

  if (filter === allFilter) {
    allFilter.classList.add('active');

    urlParams.set('filter', 'all');
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

  } else if (filter === recipesFilter) {
    queryParam = '&tag=recipe';
    recipesFilter.classList.add('active');

    urlParams.set('filter', 'recipe');
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

  } else if (filter === newestFilter) {
    queryParam = '&recent=true';
    newestFilter.classList.add('active');

    urlParams.set('filter', 'newest');
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

  } else if (filter === oldestFilter) {
    queryParam = '&oldest=true';
    oldestFilter.classList.add('active');

    urlParams.set('filter', 'oldest');
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

  } else if (filter === azFilter) {
    queryParam = '&alphabetical=true';
    azFilter.classList.add('active');

    urlParams.set('filter', 'alphabetical');
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
  }

  makeRequest(queryParam);
}

//Manipulate all blogs DOM
const blogsAllSection: HTMLElement = document.querySelector('#blogs-all .section-container') as HTMLElement;

function clearAllBlogs() {
  blogsAllSection.innerHTML = '';
}

function appendBlogs(data: any) {
  data.forEach((blog: any) => {
    blogsAllSection.innerHTML += `
      <div class="all-blog">
        <div class="cover-img">
          <img src="${blog.cover}" alt="${blog.title}" class="recipe-image">
        </div>
        <div class="content">
          <div class="wrapper">
            <h3 class="blog-title">${blog.title}</h3>
            <h6 class="blog-subtitle">${blog.subtitle}</h6>
            <p class="blog-date">${formatDate(blog.createdDate, true)}</p>
          </div>
          <div class="wrapper">
            <p class="all-blog-description">${formatString(blog.description, 255)}</p>
            <a href="/blog/${blog.uri}" class="blog-link-all accent-button button-solid-accent">Read</a>
          </div>
        </div>
      </div>
    `;
  });
}

export { };