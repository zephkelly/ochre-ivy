import { formatString, formatDate } from '../helperFunctions';

window.addEventListener('load', () => {
  const path = window.location.pathname;

  if (path.includes('/blog/')) {
    const blogPost = path.split('/blog/')[1]?.split('/')[0];

    if (blogPost != 'new' && blogPost != 'edit') {
      console.log(blogPost);
      blogPostValidation();
    }
  }
});

function blogPostValidation() {
  //Validate text
  const imageCaptions: NodeListOf<HTMLElement> = document.querySelectorAll('.image-tool__caption') as NodeListOf<HTMLElement>;
  const paragraphText: NodeListOf<HTMLElement> = document.querySelectorAll('.ce-paragraph') as NodeListOf<HTMLElement>;
  const headerText: NodeListOf<HTMLElement> = document.querySelectorAll('.ce-header') as NodeListOf<HTMLElement>;
  const quotesText: NodeListOf<HTMLElement> = document.querySelectorAll('.cdx-quote__text') as NodeListOf<HTMLElement>;
  const quotesCaption: NodeListOf<HTMLElement> = document.querySelectorAll('.cdx-quote__caption') as NodeListOf<HTMLElement>;
  const listItems: NodeListOf<HTMLElement> = document.querySelectorAll('.cdx-list__item') as NodeListOf<HTMLElement>;

  elementTextValidation(imageCaptions);
  elementTextValidation(paragraphText);
  elementTextValidation(headerText);
  elementTextValidation(quotesText);
  elementTextValidation(quotesCaption);
  elementTextValidation(listItems);

  function elementTextValidation(elementNodeList: NodeListOf<HTMLElement>) {
    elementNodeList.forEach((element) => {
      if (element.textContent != null) {
        element.innerHTML = formatString(element.textContent);
      }
    });
  }

  const blogCreatedDate: HTMLElement = document.getElementById('post-date') as HTMLElement;

  const blogCreatedDateText = blogCreatedDate?.innerText;
  const date = formatDate(blogCreatedDateText);
  blogCreatedDate.innerText = date
}  