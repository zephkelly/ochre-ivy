import { formatString, formatDate } from '../helperFunctions';

let urlParams: any = null

//Search
const searchInput: HTMLInputElement = document.querySelector('.search-input') as HTMLInputElement;
let lastSearchInput: string = '';
let searchInputValue: string = '';

// Filter blogs by category
const allFilter: HTMLElement = document.querySelector('.filter-button.all') as HTMLElement;
const recipesFilter: HTMLElement = document.querySelector('.filter-button.recipes') as HTMLElement;
const newestFilter: HTMLElement = document.querySelector('.filter-button.newest') as HTMLElement;
const oldestFilter: HTMLElement = document.querySelector('.filter-button.oldest') as HTMLElement;
const azFilter: HTMLElement = document.querySelector('.filter-button.az') as HTMLElement;
const filters = [allFilter, recipesFilter, newestFilter, oldestFilter, azFilter];

// Navigation menu
const blogsNav: HTMLElement = document.querySelector('.blogs-home-nav') as HTMLElement;
const blogTitle: HTMLElement = document.querySelector('.blog-nav-title') as HTMLElement;
const blogNavHome: HTMLElement = document.querySelector('.blog-nav-home') as HTMLElement;
const blogNavAll: HTMLElement = document.querySelector('.blog-nav-all') as HTMLElement;
const navHeaderBgBox: HTMLElement = document.querySelector('.blogs-header-bgBox') as HTMLElement;

const blogHomePage: HTMLElement = document.querySelector('.faux-page-home') as HTMLElement;
const blogAllPage: HTMLElement = document.querySelector('.faux-page-all') as HTMLElement;

const featuredBlogs: NodeListOf<HTMLElement> = document.querySelectorAll('.featured-blog') as NodeListOf<HTMLElement>;
const featuredBlogLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.featured-blog-link') as NodeListOf<HTMLElement>;
let blogCreatedDate: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-date') as NodeListOf<HTMLElement>;
const blogDescription: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-description') as NodeListOf<HTMLElement>;
const recipeDescription: NodeListOf<HTMLElement> = document.querySelectorAll('.recipe-description') as NodeListOf<HTMLElement>;

let allBlogsDescriptions: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-description.all') as NodeListOf<HTMLElement>;
let allBlogsSubtitles: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-subtitle.all') as NodeListOf<HTMLElement>;
const blogsAllSection: HTMLElement = document.querySelector('#blogs-all .section-container') as HTMLElement;
const morebutton: HTMLElement = document.querySelector('#blogs-more .more-button') as HTMLElement;
const footerContainer: HTMLElement = document.querySelector('#footer-main .container') as HTMLElement;

window.addEventListener('load', async () => {
  urlParams = new URLSearchParams(window.location.search);
  const path = window.location.pathname;

  if (path.includes('/blog') && !path.includes('/blog/')) {
    start()
  }
});

let lastFeaturedBlog = featuredBlogs.length - 1;
let currentFeaturedBlog = 0;

let activePage = 'home';

async function start() {
  setEventListeners();

  (async function () {
    const section = urlParams.get('section');
    const filter = urlParams.get('filter');

    if (section === 'all') {
      searchInputValue = searchInput.value;

      if (searchInputValue.length > 0) {
        await makeRequest('&search=' + searchInputValue);
        removeActiveFilter();
      }

      if (filter !== null || filter !== undefined || filter !== 'none' || filter !== '') {
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

      await makeRequest('');
      enableAllPage();
      return;
    }
    else {
      enableHomePage();
      return;
    }
  })()

  function descriptionSize() {
    if (window.innerWidth < 630) {
      return 180;
    }
    else {
      return 400
    }
  }

  for (let i = 0; i < blogCreatedDate.length; i++) {
    const dateAttribute: any = blogCreatedDate[i].getAttribute('data-date');
    const date = formatDate(dateAttribute, true);
    blogCreatedDate[i].innerText = date;
  }

  for (let i = 0; i < blogDescription.length; i++) {
    const descriptionAttribute: any = blogDescription[i].getAttribute('data-description');
    const description = formatString(descriptionAttribute, descriptionSize());
    blogDescription[i].innerText = description;
  }

  for (let i = 0; i < recipeDescription.length; i++) {
    const descriptionAttribute: any = recipeDescription[i].getAttribute('data-description');
    const description = formatString(descriptionAttribute, 250);
    recipeDescription[i].innerText = description;
  }

  for (let i = 0; i < allBlogsDescriptions.length; i++) {
    const allBlogsDescriptionText = allBlogsDescriptions[i].innerText;
    const description = formatString(allBlogsDescriptionText, 255);
    allBlogsDescriptions[i].innerText = description;
  }

  changeFeaturedCoverPosition();
  cycleFeaturedBlogs();
}

function setEventListeners() {
  filters.forEach((filter) => {
      filter.addEventListener('click', () => {
        if (filter.classList.contains('active')) {
          return;
    
        } else {
          const urlParams = new URLSearchParams(window.location.search);
          urlParams.delete('page');
    
          setActiveFilter(filter);
        }
      });
  });


  let formattedForMobile = false;
  window.addEventListener('resize', () => {
    changeFeaturedCoverPosition();

    if (window.innerWidth < 460) {
      if (!formattedForMobile) {
        formatStringElements(blogDescription, 400);
        formatStringElements(recipeDescription, 180);

        formattedForMobile = true;
      }

      if (activePage === 'home') {
        blogsNav.style.paddingLeft = '0rem';
        blogTitle.style.paddingLeft = '0rem';
      }
      else {
        blogsNav.style.paddingLeft = '';
        blogTitle.style.paddingLeft = '0rem';
      }
    }
    else if (window.innerWidth > 630) {
      if (formattedForMobile) {
        formatStringElements(blogDescription, 400);
        formatStringElements(recipeDescription, 250);

        formattedForMobile = false;
      }

      if (activePage === 'home') {
        blogsNav.style.paddingLeft = '';
        blogTitle.style.paddingLeft = '';
      }
      else {
        blogsNav.style.paddingLeft = '';
        blogTitle.style.paddingLeft = '0rem';
      }
    }

    formatAllBlogDescriptions();
    formatAllBlogSubtitles();
  });

  blogNavHome.addEventListener('click', () => {
    if (blogNavHome.classList.contains('active')) {
      return;
    }

    enableHomePage();
  });

  blogNavAll.addEventListener('click', () => {
    if (blogNavAll.classList.contains('active')) {
      return;
    }

    setActiveFilter(allFilter);
    enableAllPage();
  });

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
      interval = setInterval(cycleFeaturedBlogs, 10000);
    });
  });

  // Search bar for all page
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

  //More button
  morebutton.addEventListener('click', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sectionParam = urlParams.get('section');
    let pageParam = urlParams.get('page');

    if (!pageParam) {
      pageParam = '1';
    }

    const filterParam = urlParams.get('filter');

    let queryParam = 'section=' + sectionParam + '&filter=' + filterParam;

    if (pageParam) {
      makeRequest(queryParam, parseInt(pageParam) + 1);
    }
  });
}

function enableHomePage() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete('section');
  urlParams.delete('filter');
  urlParams.delete('page');
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

  interval = setInterval(cycleFeaturedBlogs, 6500);
  activePage = 'home';

  checkIfPaddingLeft();

  //Reset all page
  searchInput.value = '';
  searchInputValue = '';
  blogsAllSection.innerHTML = '';

  removeActiveFilter();

  blogNavHome.classList.add('active');
  blogNavAll.classList.remove('active');

  navHeaderBgBox.style.transform = 'rotate(-8deg)';
  navHeaderBgBox.style.position = 'absolute';
  navHeaderBgBox.style.top = '';
  navHeaderBgBox.style.height = '';
  navHeaderBgBox.style.borderRadius = '';

  footerContainer.style.borderTop = 'none';
  blogTitle.style.marginLeft = '';

  blogAllPage.classList.remove('active');

  setTimeout(() => {
    blogAllPage.style.display = 'none';
    blogHomePage.style.display = 'block';
  
    setTimeout(() => {
      blogHomePage.classList.add('active');
    }, 5);
  }, 150);

  function checkIfPaddingLeft() {
    if (window.innerWidth < 630) {
      blogTitle.style.paddingLeft = '0rem';
      blogsNav.style.paddingLeft = '';
    } 
    else {
      blogTitle.style.paddingLeft = '';
    }
  }
}

function enableAllPage() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('section', 'all');
  urlParams.delete('page');
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

  activePage = 'all';
  interval = null;

  checkIfPaddingLeft();

  blogNavHome.classList.remove('active');
  blogNavAll.classList.add('active');

  navHeaderBgBox.style.transform = 'rotate(0deg)';
  navHeaderBgBox.style.position = 'fixed';
  navHeaderBgBox.style.top = '0rem';
  navHeaderBgBox.style.height = "120vh"
  navHeaderBgBox.style.borderRadius = '0rem';

  footerContainer.style.borderTop = '2px solid var(--dark)';
  blogTitle.style.paddingLeft = '0rem';

  blogHomePage.classList.remove('active');

  setTimeout(() => {
    blogHomePage.style.display = 'none';
    blogAllPage.style.display = 'block';

    setTimeout(() => {
      blogAllPage.classList.add('active');
    }, 5);
  }, 150);

  function checkIfPaddingLeft() {
    if (window.innerWidth < 630) {
      blogsNav.style.paddingLeft = '';
      blogTitle.style.marginLeft = '0rem';
    }
    else {
      blogTitle.style.marginLeft = '-0.2rem';
    }
  }
}



let interval: any = null;
function cycleFeaturedBlogs() {
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

function setActiveFilter(filter: HTMLElement) {
  removeActiveFilter();
  filter.classList.add('active');

  const urlParams = new URLSearchParams(window.location.search);

  function getFilter(): string {
    if (filter === allFilter) {
      return 'none';
    } else if (filter === recipesFilter) {
      return 'recipe';
    } else if (filter === newestFilter) {
      return 'newest';
    } else if (filter === oldestFilter) {
      return 'oldest';
    } else if (filter === azFilter) {
      return 'alphabetical';
    }

    console.log("Cant find filter");
    return 'none';
  }

  const selectedFilter = getFilter();

  urlParams.set('filter', selectedFilter);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

  makeRequest("&filter=" + selectedFilter);
}

function removeActiveFilter() {
  filters.forEach((filter) => {
    filter.classList.remove('active');
  });
}

function clearAllBlogs() {
  blogsAllSection.innerHTML = '';
}

function checkIfMoreBlogs(data: any) {
  if (data.length % 10 === 0 && data.length > 0) {
    morebutton.style.display = 'flex';
  } else {
    morebutton.style.display = 'none';
  }
}

function appendBlogs(data: any) {
  //for loop
  for (let i = 0; i < data.length; i++) {
    blogsAllSection.innerHTML += `
    <div class="all-blog">
      <div class="cover-img">
        <img src="${data[i].cover}" alt="${data[i].title}" class="recipe-image">
      </div>
      <div class="content">
        <div class="wrapper">
          <h3 class="blog-title">${data[i].title}</h3>
          <h6 class="blog-subtitle all" data-subtitle="${data[i].subtitle}"></h6>
          <p class="blog-date all" data-date="${data[i].createdDate}"></p>
        </div>
        <div class="wrapper">
          <p class="blog-description all" data-description="${data[i].description}"></p>
          <a href="/blog/${data[i].uri}" class="blog-link-all accent-button button-outlined-accent">Read</a>
        </div>
      </div>
    </div>
  `;
  }

  const createdDates = document.querySelectorAll('.blog-date.all');
  createdDates.forEach((date) => {
    const dateData: any = date.getAttribute('data-date');
    date.innerHTML = formatDate(dateData, true);
  });

  const descriptions: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-description.all');
  const subtitles: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-subtitle.all');
  allBlogsDescriptions = descriptions;
  allBlogsSubtitles = subtitles;
  
  formatAllBlogDescriptions();
  formatAllBlogSubtitles();
}

function formatAllBlogDescriptions() {
  if (window.innerWidth < 400) {
    formatStringElements(allBlogsDescriptions, 80);
  } else if (window.innerWidth < 530) {
    formatStringElements(allBlogsDescriptions, 200);
  } else if (window.innerWidth < 800) {
    formatStringElements(allBlogsDescriptions, 380);
  } else {
    formatStringElements(allBlogsDescriptions, 200);
  }
}

function formatAllBlogSubtitles() {
  if (window.innerWidth < 400) {
    formatStringElements(allBlogsSubtitles, 64, 'data-subtitle');
  } else if (window.innerWidth < 530) {
    formatStringElements(allBlogsSubtitles, 80, 'data-subtitle');
  } else if (window.innerWidth < 800) {
    formatStringElements(allBlogsSubtitles, 150, 'data-subtitle');
  } else {
    formatStringElements(allBlogsSubtitles, 200, 'data-subtitle');
  }
}

//Request
async function makeRequest(queryParam: string, page = 1) {
  if (page == null || page == undefined) {
    page = 1;
  }

  const response = await fetch('/api/blog?display=true' + queryParam + '&page=' + page, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (await response.status !== 200) {
    console.log('Error: ' + response.status);
    clearAllBlogs();
    return;
  }

  const data = await response.json();

  if (page == 1) {
    clearAllBlogs();
  }

  checkIfMoreBlogs(data);
  appendBlogs(data);
}

function changeFeaturedCoverPosition() {
  if (window.innerWidth < 980) {
    featuredBlogs.forEach((blog) => {
      const content = blog.querySelector('.content') as HTMLElement;
      const contentString = content.outerHTML;

      blog.removeChild(content);
      blog.innerHTML += contentString;
    });
  }
  else {
    featuredBlogs.forEach((blog) => {
      const cover = blog.querySelector('.cover-img') as HTMLElement;
      const coverString = cover.outerHTML;

      blog.removeChild(cover);
      blog.innerHTML += coverString;
    });
  }
}

function formatStringElements(descriptionElement: any, charCount: number, attribute:string = 'data-description') {
  descriptionElement.forEach((description: any) => {
    const descriptionData: any = description.getAttribute(attribute);
    description.innerHTML = formatString(descriptionData, charCount);
  });
}

export { };