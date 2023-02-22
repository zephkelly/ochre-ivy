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

//Nav Menus
const blogsNav: HTMLElement = document.querySelector('.blogs-home-nav') as HTMLElement;
const blogTitle: HTMLElement = document.querySelector('.blog-nav-title') as HTMLElement;
const blogNavHome: HTMLElement = document.querySelector('.blog-nav-home') as HTMLElement;
const blogNavAll: HTMLElement = document.querySelector('.blog-nav-all') as HTMLElement;
const navHeaderBgBox: HTMLElement = document.querySelector('.blogs-header-bgBox') as HTMLElement;

const blogHomePage: HTMLElement = document.querySelector('.faux-page-home') as HTMLElement;
const blogAllPage: HTMLElement = document.querySelector('.faux-page-all') as HTMLElement;

// Misc Elements
const featuredBlogs: NodeListOf<HTMLElement> = document.querySelectorAll('.featured-blog') as NodeListOf<HTMLElement>;
const featuredNav: HTMLElement = document.querySelector('#blogs-featured .featured-nav') as HTMLElement;
const featuredBlogLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.featured-blog-link') as NodeListOf<HTMLElement>;

const blogsRecipesPopular: HTMLElement = document.querySelector('#blogs-recipes-popular') as HTMLElement;

const blogsAllSection: HTMLElement = document.querySelector('#blogs-all .section-container') as HTMLElement;
const morebutton: HTMLElement = document.querySelector('#blogs-more .more-button') as HTMLElement;
const footerContainer: HTMLElement = document.querySelector('#footer-main .container') as HTMLElement;

// Formattable elements
let blogTitles: any = null;
// let allBlogTitles: any = null;
let recentBlogTitles: any = null;
let featuredBlogTitles: any = null;

let blogDescriptions: any = null;
let blogDescriptionsAll: any = null;
let blogDescriptionsRecipes: any = null;

let blogSubtitles: any = null;
let blogSubtitlesAll: any = null;
let blogCreatedDate: any = null;

window.addEventListener('load', async () => {
  urlParams = new URLSearchParams(window.location.search);
  const path = window.location.pathname;

  if (path.includes('/blog') && !path.includes('/blog/')) {
    await start()

    blogTitles = document.querySelectorAll('.blog-title') as NodeListOf<HTMLElement>;
    // allBlogTitles = document.querySelectorAll('.blog-title.all') as NodeListOf<HTMLElement>;
    recentBlogTitles = document.querySelectorAll('.recent-blog-title') as NodeListOf<HTMLElement>;
    featuredBlogTitles = document.querySelectorAll('.blog-title.featured') as NodeListOf<HTMLElement>;

    blogDescriptions = document.querySelectorAll('.blog-description') as NodeListOf<HTMLElement>;
    blogDescriptionsAll = document.querySelectorAll('.blog-description.all') as NodeListOf<HTMLElement>;
    blogDescriptionsRecipes = document.querySelectorAll('.blog-description.recipe') as NodeListOf<HTMLElement>;

    blogSubtitles = document.querySelectorAll('.blog-subtitle') as NodeListOf<HTMLElement>;
    blogSubtitlesAll = document.querySelectorAll('.blog-subtitle.all') as NodeListOf<HTMLElement>;
    blogCreatedDate = document.querySelectorAll('.blog-date') as NodeListOf<HTMLElement>;

    await setDataAttributes();
    formatElements();
  }
});

let activePage = 'home';
function start() {
  setEventListeners();

  activatePages();

  adjustBlogNavPadding();
  changeFeaturedCoverPosition();
  cycleFeaturedBlogs(null, true);

  hideExtraBlogs('#blogs-recipes .recipe-blog', 3, 4)
  hideExtraBlogs('#blogs-recent .recent-blog', 4, 5)
}

async function activatePages() {
  const section = urlParams.get('section');

  if (section === 'all') {
    searchInputValue = searchInput.value;

    if (searchInputValue.length > 0) {
      await makeRequest('&search=' + searchInputValue);
      removeActiveFilter();
    }
    else {
      setActiveFilter(allFilter);
      await makeRequest('');
    }

    enableAllPage();
  }
  else {
    enableHomePage();
  }
}

function setEventListeners() {
  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      if (filter.classList.contains('active')) {
        return;
      }
      else {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete('page');
  
        setActiveFilter(filter);
      }
    });
  });

  window.addEventListener('resize', async () => {
    setfeaturedBlogNavMargin()
    changeFeaturedCoverPosition();
    adjustBlogNavPadding();

    hideExtraBlogs('#blogs-recipes .recipe-blog', 3, 4)
    hideExtraBlogs('#blogs-recent .recent-blog', 4, 5)

    formatElements();
  });

  blogNavHome.addEventListener('click', () => {
    if (blogNavHome.classList.contains('active')) {
      return;
    }

    enableHomePage();
    formatElements();
  });

  blogNavAll.addEventListener('click', () => {
    if (blogNavAll.classList.contains('active')) {
      return;
    }

    setActiveFilter(allFilter);
    makeRequest('');

    enableAllPage();
    formatElements();
  });

  featuredBlogLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (link.classList.contains('active')) {
        return;
      }

      const linkIndex = Array.from(featuredBlogLinks).indexOf(link);

      cycleFeaturedBlogs(linkIndex);

      clearInterval(featuredInterval);
      featuredInterval = setInterval(cycleFeaturedBlogs, 10000);
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

async function setDataAttributes() {
  for (let i = 0; i < blogTitles.length; i++) {
    const titleAttribute: string = await blogTitles[i].getAttribute('data-title');
    blogTitles[i].innerText = titleAttribute;
  }
  for (let i = 0; i < blogCreatedDate.length; i++) {
    const dateAttribute: any = await blogCreatedDate[i].getAttribute('data-date');
    let date: any = null;

    try {
      date = formatDate(dateAttribute, true);
    }
    catch (e) {
      console.log(e);
    }

    blogCreatedDate[i].innerText = date;
  }
  for (let i = 0; i < blogDescriptions.length; i++) {
    const descriptionAttribute: any = await blogDescriptions[i].getAttribute('data-description');
    const description = formatString(descriptionAttribute, descriptionSize());
    blogDescriptions[i].innerText = description;
  }
  for (let i = 0; i < blogDescriptionsRecipes.length; i++) {
    const descriptionAttribute: any = await blogDescriptionsRecipes[i].getAttribute('data-description');
    const description = formatString(descriptionAttribute, descriptionSize());
    blogDescriptionsRecipes[i].innerText = description;
  }
  for (let i = 0; i < blogDescriptionsAll.length; i++) {
    const text: any = await blogDescriptionsAll[i].getAttribute('data-description');
    blogDescriptionsAll[i].innerText = formatString(text, descriptionSize());
  }
  for (let i = 0; i < blogSubtitles.length; i++) {
    const blogSubtitleText: any = await blogSubtitles[i].getAttribute('data-subtitle');
    const subtitle = formatString(blogSubtitleText, subtitleSize());
    blogSubtitles[i].innerText = subtitle;
  }
}

function formatElements() {

  formatFeaturedBlogTitles();
  formatRecentBlogTitles();
  formatBlogSubtitles();
  formatBlogSubtitlesAll();
  formatBlogSubtitlesFeatured();
  formatBlogDescriptions();
  formatBlogsDescriptionsAll();
  formatBlogsRecipesDescriptions();
}

function adjustBlogNavPadding() {
  if (window.innerWidth < 460) {
    blogTitle.style.paddingLeft = '0rem';
    blogsNav.style.paddingLeft = '0rem';
  }
  else if (window.innerWidth < 630) {
    blogTitle.style.paddingLeft = '0rem';
    blogsNav.style.paddingLeft = '0rem';
  }
  else {
    if (activePage === 'home') {
      blogTitle.style.paddingLeft = '1.75rem';
      blogsNav.style.paddingLeft = '0rem';
    }
    else {
      blogTitle.style.paddingLeft = '0rem';
      blogsNav.style.paddingLeft = '0rem';
    }
  }
}

function setfeaturedBlogNavMargin() {
  const currentFeaturedBlog: HTMLElement = document.querySelector('.featured-blog.active') as HTMLElement;

  const featuredHeight = currentFeaturedBlog.offsetHeight;

  const totalHeight = featuredHeight + 50;
  
  featuredNav.style.top = totalHeight + 'px';

  if (totalHeight > 700) {
    const difference = totalHeight - 670;
    blogsRecipesPopular.style.paddingTop = difference + 'px';
  } else {
    blogsRecipesPopular.style.paddingTop = '0px';
  }
}

function descriptionSize() {
  if (window.innerWidth < 630) {
    return 180;
  } else {
    return 400
  }
}

function subtitleSize() {
  if (window.innerWidth < 630) {
    return 64;
  } else {
    return 100
  }
}

function enableHomePage() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete('section');
  urlParams.delete('filter');
  urlParams.delete('page');
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

  clearInterval(featuredInterval);
  featuredInterval = setInterval(cycleFeaturedBlogs, 6500);
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
      blogTitle.style.paddingLeft = '1.75rem';
    }
  }
}

function enableAllPage() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('section', 'all');
  urlParams.delete('page');
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

  activePage = 'all';

  checkIfPaddingLeft();
  clearInterval(featuredInterval);

  setActiveFilter('all');

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

let currentFeaturedBlog = 0;
let lastFeaturedBlog = featuredBlogs.length - 1;
let featuredInterval: any = null;
function cycleFeaturedBlogs(clickedBlog: any = null, initial: boolean = false) {
  lastFeaturedBlog = currentFeaturedBlog;

  featuredBlogLinks[lastFeaturedBlog].classList.remove('active');
  featuredBlogs[lastFeaturedBlog].classList.remove('active');
  featuredBlogs[lastFeaturedBlog].style.opacity = '0';
  
  setTimeout(() => {
    featuredBlogs[lastFeaturedBlog].style.display = 'none';
  }, 500)
  
  if (clickedBlog != null) {
    currentFeaturedBlog = clickedBlog;
  }
  else {
    currentFeaturedBlog = (currentFeaturedBlog + 1) % featuredBlogs.length;
  }

  featuredBlogLinks[currentFeaturedBlog].classList.add('active');

  featuredBlogs[currentFeaturedBlog].classList.add('active');
  featuredBlogs[currentFeaturedBlog].style.display = 'flex';

  if (initial) {
    setTimeout(() => { setfeaturedBlogNavMargin(); }, 5);
  } else {
    setfeaturedBlogNavMargin();
  }

  setTimeout(() => {
    featuredBlogs[currentFeaturedBlog].style.opacity = '1';
  }, 5)
}

function setActiveFilter(filter: HTMLElement) {
  removeActiveFilter();
  console.log("Removing active filter");

  filter.classList.add('active');
  console.log(filter + " Should be active");

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
  else if (filter == String) {
    switch (filter) {
      case 'all':
        setActiveFilter(allFilter);
        break;
      case 'recipe':
        setActiveFilter(recipesFilter);
        break;
      case 'newest':
        setActiveFilter(newestFilter);
        break;
      case 'oldest':
        setActiveFilter(oldestFilter);
        break;
      case 'alphabetical':
        setActiveFilter(azFilter);
        break;
    }
  }
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

const hideExtraBlogs_current = { width: 200 };
function hideExtraBlogs(selector: string, max630: number, max980: number) {
  if (window.innerWidth < 630) {
    if (hideExtraBlogs_current.width === 630) return;
    hideExtraBlogs_current.width = 630;

    const blogs = getBlogs(selector);
    for (let i = max630; i < blogs.length; i++) {
      blogs[i].classList.add('hidden');
    }
  }
  else if (window.innerWidth < 980) {
    if (hideExtraBlogs_current.width === 980) return;
    hideExtraBlogs_current.width = 980;

    const blogs = getBlogs(selector);
    for (let i = max980; i < blogs.length; i++) {
      blogs[i].classList.add('hidden');
    }
  }
  else {
    if (hideExtraBlogs_current.width === 1000) return;
    hideExtraBlogs_current.width = 1000;

    const blogs = getBlogs(selector);
    for (let i = 0; i < blogs.length; i++) {
      blogs[i].classList.remove('hidden');
    }
  }
}

const formatRecentBlogTitles_current = { width: 200 };
function formatRecentBlogTitles() {
  if (window.innerWidth < 400) {
    if (formatRecentBlogTitles_current.width === 400) return;
    formatRecentBlogTitles_current.width = 400;
    getTitles();

    formatStringElements(recentBlogTitles, 50, 'data-title');
  }
  else if (window.innerWidth < 530) {
    if (formatRecentBlogTitles_current.width === 530) return;
    formatRecentBlogTitles_current.width = 530;
    getTitles();

    formatStringElements(recentBlogTitles, 80, 'data-title');
  }
  else if (window.innerWidth < 800) {
    if (formatRecentBlogTitles_current.width === 800) return;
    formatRecentBlogTitles_current.width = 800;
    getTitles();

    formatStringElements(recentBlogTitles, 120, 'data-title');
  }
  else {
    if (formatRecentBlogTitles_current.width === 1000) return;
    formatRecentBlogTitles_current.width = 1000;
    getTitles();

    formatStringElements(recentBlogTitles, 200, 'data-title');
  }

  function getTitles() {
    const recentTitles: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-title.recent');
    recentBlogTitles = recentTitles;
  }
}

const formatFeaturedtBlogTitles_current = { width: 200 };
function formatFeaturedBlogTitles() {
  if (window.innerWidth < 400) {
    if (formatFeaturedtBlogTitles_current.width === 400) return;
    formatFeaturedtBlogTitles_current.width = 400;
    getTitles();

    formatStringElements(featuredBlogTitles, 25, 'data-title');
  }
  else if (window.innerWidth < 530) {
    if (formatFeaturedtBlogTitles_current.width === 530) return;
    formatFeaturedtBlogTitles_current.width = 530;
    getTitles();

    formatStringElements(featuredBlogTitles, 80, 'data-title');
  }
  else if (window.innerWidth < 800) {
    if (formatFeaturedtBlogTitles_current.width === 800) return;
    formatFeaturedtBlogTitles_current.width = 800;
    getTitles();

    formatStringElements(featuredBlogTitles, 120, 'data-title');
  }
  else {
    if (formatFeaturedtBlogTitles_current.width === 1000) return;
    formatFeaturedtBlogTitles_current.width = 1000;
    getTitles();

    formatStringElements(featuredBlogTitles, 200, 'data-title');
  }

  function getTitles() {
    const featuredTitles: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-title.featured');
    featuredBlogTitles = featuredTitles;
  }
}

const formatBlogSubtitles_current = { width: 200 };
function formatBlogSubtitles() {
  if (window.innerWidth < 400) {
    if (formatBlogSubtitles_current.width === 400) return;
    formatBlogSubtitles_current.width = 400;
    getSubtitles();

    formatStringElements(blogSubtitles, 64, 'data-subtitle');
  } else if (window.innerWidth < 530) {
    if (formatBlogSubtitles_current.width === 530) return;
    formatBlogSubtitles_current.width = 530;
    getSubtitles();

    formatStringElements(blogSubtitles, 80, 'data-subtitle');
  } else if (window.innerWidth < 800) {
    if (formatBlogSubtitles_current.width === 800) return;
    formatBlogSubtitles_current.width = 800;
    getSubtitles();

    formatStringElements(blogSubtitles, 150, 'data-subtitle');
  } else {
    if (formatBlogSubtitles_current.width === 1000) return;
    formatBlogSubtitles_current.width = 1000;
    getSubtitles();
    formatStringElements(blogSubtitles, 200, 'data-subtitle');
  }

  function getSubtitles() {
    const subtitles: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-subtitle');
    blogSubtitles = subtitles;
  }
}

const formatBlogSubtitlesFeatured_current = { width: 200 };
function formatBlogSubtitlesFeatured() {
  if (window.innerWidth < 400) {
    if (formatBlogSubtitlesFeatured_current.width === 400) return;
    formatBlogSubtitlesFeatured_current.width = 400;
    getSubtitles();

    formatStringElements(blogSubtitlesAll, 50, 'data-subtitle');
  } else if (window.innerWidth < 530) {
    if (formatBlogSubtitlesFeatured_current.width === 530) return;
    formatBlogSubtitlesFeatured_current.width = 530;
    getSubtitles();

    formatStringElements(blogSubtitlesAll, 75, 'data-subtitle');
  } else if (window.innerWidth < 630) {
    if (formatBlogSubtitlesFeatured_current.width === 630) return;
    formatBlogSubtitlesFeatured_current.width = 630;
    getSubtitles();

    formatStringElements(blogSubtitlesAll, 100, 'data-subtitle');
  } else {
    if (formatBlogSubtitlesFeatured_current.width === 1000) return;
    formatBlogSubtitlesFeatured_current.width = 1000;
    getSubtitles();

    formatStringElements(blogSubtitlesAll, 250, 'data-subtitle');
  }

  function getSubtitles() {
    const subtitlesAll: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-subtitle.featured');
    blogSubtitlesAll = subtitlesAll;
  }
}

const formatBlogSubtitlesAll_current = { width: 200 };
function formatBlogSubtitlesAll() {
  if (window.innerWidth < 400) {
    if (formatBlogSubtitlesAll_current.width === 400) return;
    formatBlogSubtitlesAll_current.width = 400;
    getSubtitles();

    formatStringElements(blogSubtitlesAll, 64, 'data-subtitle');
  } else if (window.innerWidth < 530) {
    if (formatBlogSubtitlesAll_current.width === 530) return;
    formatBlogSubtitlesAll_current.width = 530;
    getSubtitles();

    formatStringElements(blogSubtitlesAll, 80, 'data-subtitle');
  } else if (window.innerWidth < 800) {
    if (formatBlogSubtitlesAll_current.width === 800) return;
    formatBlogSubtitlesAll_current.width = 800;
    getSubtitles();

    formatStringElements(blogSubtitlesAll, 200, 'data-subtitle');
  } else {
    if (formatBlogSubtitlesAll_current.width === 1000) return;
    formatBlogSubtitlesAll_current.width = 1000;
    getSubtitles();

    formatStringElements(blogSubtitlesAll, 250, 'data-subtitle');
  }

  function getSubtitles() {
    const subtitlesAll: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-subtitle.all');
    blogSubtitlesAll = subtitlesAll;
  }
}

const formatBlogDescriptions_current = { width: 200 };
function formatBlogDescriptions() {
  if (window.innerWidth < 400) {
    if (formatBlogDescriptions_current.width === 400) return;
    formatBlogDescriptions_current.width = 400;
    getDescriptions();

    formatStringElements(blogDescriptions, 80);
  } else if (window.innerWidth < 530) {
    if (formatBlogDescriptions_current.width === 530) return;
    formatBlogDescriptions_current.width = 530;
    getDescriptions();

    formatStringElements(blogDescriptions, 200);
  } else if (window.innerWidth < 800) {
    if (formatBlogDescriptions_current.width === 800) return;
    formatBlogDescriptions_current.width = 800;
    getDescriptions();

    formatStringElements(blogDescriptions, 380);
  } else {
    if (formatBlogDescriptions_current.width === 1000) return;
    formatBlogDescriptions_current.width = 1000;
    getDescriptions();

    formatStringElements(blogDescriptions, 400);
  }

  function getDescriptions() {
    const descriptions: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-description');
    blogDescriptions = descriptions;
  }
}

const formatBlogDescriptionsAll_current = { width: 200 };
function formatBlogsDescriptionsAll() {
  if (window.innerWidth < 400) {
    if (formatBlogDescriptionsAll_current.width === 400) return;
    formatBlogDescriptionsAll_current.width = 400;
    getDescription();

    formatStringElements(blogDescriptionsAll, 80);
  } else if (window.innerWidth < 530) {
    if (formatBlogDescriptionsAll_current.width === 530) return;
    formatBlogDescriptionsAll_current.width = 530;
    getDescription();

    formatStringElements(blogDescriptionsAll, 150);
  } else if (window.innerWidth < 800) {
    if (formatBlogDescriptionsAll_current.width === 800) return;
    formatBlogDescriptionsAll_current.width = 800;
    getDescription();

    formatStringElements(blogDescriptionsAll, 300);
  } else {
    if (formatBlogDescriptionsAll_current.width === 1000) return;
    formatBlogDescriptionsAll_current.width = 1000;
    getDescription();

    formatStringElements(blogDescriptionsAll, 400);
  }

  function getDescription() {
    const descriptions: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-description.all');
    blogDescriptionsAll = descriptions;
  }
}

const formatBlogDescriptionsRecipes_current = { width: 400 };
function formatBlogsRecipesDescriptions() {
  if (window.innerWidth < 400) {
    if (formatBlogDescriptionsRecipes_current.width === 400) return;
    formatBlogDescriptionsRecipes_current.width = 400;
    getDescription();

    formatStringElements(blogDescriptionsRecipes, 150);
  }
  else if (window.innerWidth < 530) {
    if (formatBlogDescriptionsRecipes_current.width === 530) return;
    formatBlogDescriptionsRecipes_current.width = 530;
    getDescription();

    formatStringElements(blogDescriptionsRecipes, 150);
  }
  else if (window.innerWidth < 800) {
    if (formatBlogDescriptionsRecipes_current.width === 800) return;
    formatBlogDescriptionsRecipes_current.width = 800;
    getDescription();

    formatStringElements(blogDescriptionsRecipes, 200);
  }
  else {
    if (formatBlogDescriptionsRecipes_current.width === 1000) return;
    formatBlogDescriptionsRecipes_current.width = 1000;
    getDescription();

    formatStringElements(blogDescriptionsRecipes, 400);
  }

  function getDescription() {
    const descriptions: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-description.recipe');
    blogDescriptions = descriptions;
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

function appendBlogs(data: any) {
  //for loop
  for (let i = 0; i < data.length; i++) {
    blogsAllSection.innerHTML += `
    <div class="all-blog">
      <div class="cover-img">
        <img src="/uploaded-images/thumbnails/${data[i].cover}" alt="${data[i].title}" class="recipe-image">
      </div>
      <div class="content">
        <div class="wrapper">
          <h3 class="blog-title all" data-title="${data[i].title}"></h3>
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

  const titlesAll = document.querySelectorAll('.blog-title.all');
  titlesAll.forEach((title) => {
    const titleData: any = title.getAttribute('data-title');
    title.innerHTML = formatString(titleData, 100);
  });

  const createdDates = document.querySelectorAll('.blog-date.all');
  createdDates.forEach((date) => {
    const dateData: any = date.getAttribute('data-date');
    date.innerHTML = formatDate(dateData, true);
  });

  const descAll = document.querySelectorAll('.blog-description.all');
  descAll.forEach((desc) => {
    const descData: any = desc.getAttribute('data-description');
    desc.innerHTML = formatString(descData, 200);
  });

  const subAll = document.querySelectorAll('.blog-subtitle.all');
  subAll.forEach((sub) => {
    const subData: any = sub.getAttribute('data-subtitle');
    sub.innerHTML = formatString(subData, 100);
  });

  formatBlogsDescriptionsAll();
  formatBlogSubtitlesAll();
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

function getBlogs(selector: string) {
  const blogs = document.querySelectorAll(selector);
  return blogs;
}

export { };