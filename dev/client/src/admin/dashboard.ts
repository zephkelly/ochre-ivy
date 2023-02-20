import { formatString, formatDate } from '../helperFunctions';


// Filter blogs by category
const allFilter: HTMLElement = document.querySelector('.filter-button.all') as HTMLElement;
const recipesFilter: HTMLElement = document.querySelector('.filter-button.recipes') as HTMLElement;
const newestFilter: HTMLElement = document.querySelector('.filter-button.newest') as HTMLElement;
const oldestFilter: HTMLElement = document.querySelector('.filter-button.oldest') as HTMLElement;
const azFilter: HTMLElement = document.querySelector('.filter-button.az') as HTMLElement;

const filters = [allFilter, recipesFilter, newestFilter, oldestFilter, azFilter];

const searchInput: HTMLInputElement = document.querySelector('.search-input') as HTMLInputElement;
const morebutton: HTMLElement = document.querySelector('#blogs-more .more-button') as HTMLElement;
const blogsAllSection: HTMLElement = document.querySelector('#blogs-all .section-container') as HTMLElement;

let lastSearchInput: string = '';
let searchInputValue: string = '';

window.addEventListener('load', () => {
  const path = window.location.pathname;

  if (path.includes('/dashboard') && !path.includes('/dashboard/')) {
    setEventListeners();
    dashboardValidation();
  }
});

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

function dashboardValidation() {
  // Format dates
  const blogCreatedDate: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-date') as NodeListOf<HTMLElement>;

  for (let i = 0; i < blogCreatedDate.length; i++) {
    const blogCreatedDateText = blogCreatedDate[i].innerText;
    const date = formatDate(blogCreatedDateText, true);
    blogCreatedDate[i].innerText = date.toString();
  }

  //Format descriptions
  const allBlogsDescription: NodeListOf<HTMLElement> = document.querySelectorAll('.all-blog-description') as NodeListOf<HTMLElement>;

  for (let i = 0; i < allBlogsDescription.length; i++) {
    const allBlogsDescriptionText = allBlogsDescription[i].innerText;
    const description = formatString(allBlogsDescriptionText, 155);
    allBlogsDescription[i].innerText = description;
  }

  //Format tags
  const allBlogsTags: NodeListOf<HTMLElement> = document.querySelectorAll('.blog-tags') as NodeListOf<HTMLElement>;

  for (let i = 0; i < allBlogsTags.length; i++) {
    const allBlogsTagsText = allBlogsTags[i].innerText;
    const tags = allBlogsTagsText.replace(/,/g, ', ');
    allBlogsTags[i].innerText = "tags: " + tags;
  }
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

function checkIfMoreBlogs(data: any) {
  if (data.length % 10 === 0 && data.length > 0) {
    morebutton.style.display = 'flex';
  } else {
    morebutton.style.display = 'none';
  }
}

function clearAllBlogs() {
  blogsAllSection.innerHTML = '';
}

function appendBlogs(data: any) {
  //for loop
  for (let i = 0; i < data.length; i++) {

    blogsAllSection.innerHTML += `
    <div class="all-blog dashboard">  
      <div class="cover-img">
        <img src="/thumbnails/${data[i].cover}" alt="${data[i].title}" class="recipe-image">
      </div>
      <div class="content">
        <div class="wrapper">
          <h3 class="blog-title">${data[i].title}</h3>
          <h6 class="blog-subtitle">${data[i].subtitle}</h6>  
          <p class="blog-tags">${data[i].tags}</p>
          <p class="blog-date">${formatDate(data[i].createdDate, true)}</p>
        </div>
        <div class="wrapper">
          <p class="all-blog-description">${formatString(data[i].description, 255)}</p>
          <div class="group">
            <a href="/blog/${data[i].uri}" class="blog-link-all-dash accent-button">View</a>
            <a href="/dashboard/blog/edit/${data[i].uri}" class="blog-link-all-dash accent-button">Edit</a>
            <a class="blog-link-all-dash accent-button delete-button" uri="${data[i].uri}">Delete</a>
          </div>
        </div>
      </div>
    </div>`;  
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