import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import Quote from '@editorjs/quote';
import List from '@editorjs/list';

let editor: any = null;

const saveButton: HTMLElement = document.getElementById('save-button') as HTMLElement;

window.addEventListener('DOMContentLoaded', async () => {
  //check if the url contains /blog/edit/ and if so, load the blog data
  if (window.location.href.includes('/dashboard/blog/edit/')) {
    await setupBlogEditor()
    await loadEditBlog();

    const dashboardNavLink = document.querySelector('.dashboard-nav-link') as HTMLElement;
    dashboardNavLink.innerText = 'Edit';
    
    const editorTitle = document.querySelector('.editor-title') as HTMLElement;
    editorTitle.innerText = 'Edit blog';
    
    saveButton.innerText = 'Save blog';
    saveButton.addEventListener('click', updateBlog);
    return;
  }
  else if (window.location.href.includes('/dashboard/blog/new')) {
    await setupBlogEditor();
    saveButton?.addEventListener('click', saveBlog);
  }

  function setupBlogEditor() {
    editor = new EditorJS({
      holder: 'editorjs',
      minHeight: 120,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter your heading here',
            levels: [3, 4],
            defaultLevel: 4
          }
        },
        quote: Quote,
        list: List,
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile(file: any) {
                const data = new FormData();
                data.append('blogImage', file);
                data.append('name', file.name);

                return fetch('/api/blog/imageupload', {
                  method: 'POST',
                  body: data,
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((response) => {
                    editImageSession.push(response.url);

                    return {
                      success: 1,
                      file: {
                        url: '/uploaded-images/' + response.url,
                        name: response.url
                      }
                    };
                  })
                  .catch(() => {
                    return {
                      success: 0
                    };
                  });
              },
            }
          }
        },
      } 
    });

    subtitle.addEventListener('input', validateSubtitle);
    createdDate.addEventListener('input', validateDate);
    uriInput.addEventListener('input', validateUri);
    title.addEventListener('input', validateTitle);
    tagsInput.addEventListener('input', validateTags);
  }
});

// //Session to store images uploaded to compare with final image list
const editImageSession: string[] = [];

window.addEventListener('beforeunload', async (e) => {
  //send a confirmation dialog to the user
  e.preventDefault();
  const shouldLeave = await confirm('Are you sure you want to leave?');

  if (!shouldLeave) {
    return;
  }
});

window.addEventListener('unload', async () => {
  const unusedImages = editImageSession;

  const outputData = await editor.save();
  await localStorage.setItem('draft_blogData', JSON.stringify(outputData));

  const body = { images: unusedImages };
  const headers = { type: 'application/json' };
  const blob = new Blob([JSON.stringify(body)], headers);

  navigator.sendBeacon('/api/blog/removeimages', blob);
});

const uriInput: HTMLInputElement = document.getElementById('uri-input') as HTMLInputElement;
const title: HTMLInputElement = document.getElementById('title-input') as HTMLInputElement;
const subtitle: HTMLInputElement = document.getElementById('subtitle-input') as HTMLInputElement;
const createdDate: HTMLInputElement = document.getElementById('createdDate-input') as HTMLInputElement;
const tagsInput: HTMLInputElement = document.getElementById('tags-input') as HTMLInputElement;

const uriInputValidation: HTMLElement = document.getElementById('uri-input-validation') as HTMLElement;
const titleValidation: HTMLElement = document.getElementById('title-input-validation') as HTMLElement;
const createdDateValidation: HTMLElement = document.getElementById('date-input-validation') as HTMLElement;
const tagsValidation: HTMLElement = document.getElementById('tags-input-validation') as HTMLElement;

let tags: string[] = [];

function runValidation() {
  validateUri();
  validateTitle();
  validateSubtitle();
  validateDate();
  validateTags();
}

function validateUri() {
  const uriRegex = new RegExp('^[a-zA-Z0-9-]+$');

    if (uriInput.value.length < 3 || uriInput.value.length > 50) {
      uriInput.style.borderColor = 'red';
      uriInputValidation.innerText = 'URI must be between 3 and 50 characters';
    }
    else{
      uriInput.style.borderColor = 'green';
      uriInputValidation.innerText = '';
    }
     
    if (!uriRegex.test(uriInput.value)) {
      uriInput.style.borderColor = 'red';
      uriInputValidation.innerText = 'URI can only contain letters/numbers and hyphens (eg. my-first-post)';
    }
    else {
      uriInput.style.borderColor = 'green';
      uriInputValidation.innerText = '';
    }
}

function validateTitle() {
  if (title.value.length <= 0) {
    title.style.borderColor = 'red';
    titleValidation.innerText = 'Title cannot be empty';
  }
  else {
    title.style.borderColor = 'green';
    titleValidation.innerText = '';
  }
}

function validateSubtitle() {
  if (subtitle.value.length <= 0) {
    subtitle.style.borderColor = '';
  }
  else {
    subtitle.style.borderColor = 'green';
  }
}

function validateDate() {
  const dateRegex = new RegExp('^[0-9]{4}/[0-9]{2}/[0-9]{2}$');

  if (createdDate.value.length == 0) {
    createdDate.style.borderColor = '';
    return;
  }
  else if (!dateRegex.test(createdDate.value) || createdDate.value.length > 10) {
    createdDate.style.borderColor = 'red';
    createdDateValidation.innerText = 'Date must be in format yyyy/mm/dd';
  }
  else {
    createdDate.style.borderColor = 'green';
    createdDateValidation.innerText = '';
  }
}

function validateTags() {
  const tagsRegex = new RegExp('^[a-zA-Z0-9-]+(, [a-zA-Z0-9-]+)*$');

  if (!tagsRegex.test(tagsInput.value)) {
    tagsInput.style.borderColor = 'red';
    tagsValidation.innerText = 'Tags must be separated by a comma and space (eg. tag1, tag2)';
  }
  else {
    tagsValidation.innerText = '';

    tags = tagsInput.value.split(', ').filter(tag => tag.length > 0 && tag.length < 20);

    if (tags.length > 5) {
      tagsInput.style.borderColor = 'red';
      tagsValidation.innerText = 'You can only have a maximum of 5 tags';
    }
    else if (tags.length == 0) {
      tagsInput.style.borderColor = 'red';
      tagsValidation.innerText = 'You must have at least one tag';
    } 
    else {
      tagsInput.style.borderColor = 'green';
    }
  }
}

const postResponse: HTMLElement = document.getElementById('post-response') as HTMLElement;

async function saveBlog() {
  const outputData = await editor.save();

  let coverImage = null;
  let description = null;

  for (let i = 0; i < outputData.blocks.length; i++) {
    if (outputData.blocks[i].type == 'image') {
      coverImage = outputData.blocks[i].data.file.name;
      break;
    }
  }

  for (let i = 0; i < outputData.blocks.length; i++) {
    if (outputData.blocks[i].type == 'paragraph') {
      description = outputData.blocks[i].data.text;
      break;
    }
  }

  const blogData = {
    uri: uriInput.value,
    title: title.value,
    subtitle: subtitle.value,
    description: description,
    date: createdDate.value ? createdDate.value : '',
    tags: tags,
    cover: coverImage,
    content: outputData
  }
  
  const response = await fetch('/api/blog', {
    method: 'POST',
    body: JSON.stringify(blogData),
    headers: { 'Content-Type': 'application/json' }
  });

  response.body?.getReader().read().then(({ value }) => { 
    const statusMessage = new TextDecoder().decode(value);

    if (response.status == 200) {
      postResponse.innerText = 'Blog posted successfully!';
      postResponse.style.color = 'green';

      //clear inputs
      uriInput.value = '';
      title.value = '';
      subtitle.value = '';
      createdDate.value = '';
      tagsInput.value = '';

      //clear editor
      editor.clear();
      editImageSession.length = 0;

      runValidation();
    }
    else {
      postResponse.innerText = 'Blog posting failed: ' + statusMessage;
      postResponse.style.color = 'var(--accent-color-secondary)';
    }

    console.log('[' + response.status + '] ' + response.statusText + ': ' + statusMessage);
  });
}

async function updateBlog() {
  const outputData = await editor.save();

  let coverImage = null;
  let description = null;

  for (let i = 0; i < outputData.blocks.length; i++) {
    if (outputData.blocks[i].type == 'image') {
      coverImage = outputData.blocks[i].data.file.name;
      break;
    }
  }

  for (let i = 0; i < outputData.blocks.length; i++) {
    if (outputData.blocks[i].type == 'paragraph') {
      description = outputData.blocks[i].data.text;
      break;
    }
  }

  const blogData = {
    uri: uriInput.value,
    title: title.value,
    subtitle: subtitle.value,
    description: description,
    date: createdDate.value ? createdDate.value : '',
    tags: tags,
    cover: coverImage,
    content: outputData
  }

  const response = await fetch('/api/blog/' + loadedBlog.uri, {
    method: 'PUT',
    body: JSON.stringify(blogData),
    headers: { 'Content-Type': 'application/json' }
  });

  response.body?.getReader().read().then(({ value }) => {
    const statusMessage = new TextDecoder().decode(value);

    if (response.status == 200) {
      postResponse.innerText = 'Blog updated successfully!';
      postResponse.style.color = 'green';

      (function removeUnusedImages() {
        const initialImages: string[] = [];
        const currentImages: string[] = [];

        const removableImages: string[] = [];

        for (let i = 0; i < loadedBlog.content.blocks.length; i++) {
          if (loadedBlog.content.blocks[i].type == 'image') {
            initialImages.push(loadedBlog.content.blocks[i].data.file.name);
          }
        }

        for (let i = 0; i < outputData.blocks.length; i++) {
          if (outputData.blocks[i].type == 'image') {
            currentImages.push(outputData.blocks[i].data.file.name);
          }
        }

        //if initial images does not contain current image, try remove from editImageSession
        for (let i = 0; i < initialImages.length; i++) {
          if (currentImages.includes(initialImages[i])) {
            continue;
          }
          else {
            const image = initialImages[i].replace('/uploaded-images/', '');
            editImageSession.splice(editImageSession.indexOf(image), 1);
            removableImages.push(initialImages[i]);
          }
        }

        for (let i = 0; i < currentImages.length; i++) {
          if (initialImages.includes(currentImages[i])) {
            continue;
          }
          else {
            const image = currentImages[i].replace('/uploaded-images/', '');
            editImageSession.splice(editImageSession.indexOf(image), 1);
          }
        }

        for (let i = 0; i < editImageSession.length; i++) {
          const image = editImageSession[i].replace('/uploaded-images/', '');    
          removableImages.push(image);
        }
        
        if (removableImages.length == 0) {
          console.log('No images to remove')
          return;
        } else {
          console.log('Removing images: ' + removableImages);
        }

        const body = { images: removableImages };
        const headers = { type: 'application/json' };
        const blob = new Blob([JSON.stringify(body)], headers);
    
        navigator.sendBeacon('/api/blog/removeimages', blob);
      })();

      editImageSession.length = 0;
      loadedBlog = blogData;
    }
    else {
      postResponse.innerText = 'Blog update failed: ' + statusMessage;
      postResponse.style.color = 'var(--accent-color-secondary)';
    }

    console.log('[' + response.status + '] ' + response.statusText + ': ' + statusMessage);
  });
}

let loadedBlog: any = null;
async function loadEditBlog() {
  const uri = window.location.pathname.split('/')[4];

  let blogData: any = null;
  let response: any = null
  
  await readBlogData();

  async function readBlogData() {
    response = await fetch('/api/blog/' + uri, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    try {
      await response.body?.getReader().read().then(({ value } : any) => {
        let data = new TextDecoder().decode(value);
        blogData = JSON.parse(data);
      });
    }
    catch {
      console.log("Retrying data fetch...");
      await readBlogData();
    }
  }

  loadedBlog = blogData;

  uriInput.value = blogData.uri;
  title.value = blogData.title;
  subtitle.value = blogData.subtitle;
  tagsInput.value = blogData.tags.join(', ');

  //Turn createdDate into yyyy-mm-dd format
  const date = new Date(blogData.createdDate);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day: number = date.getDate();

  function pad(n: number) {
    return n < 10 ? '0' + n : n;
  }

  createdDate.value = year + '/' + pad(month) + '/' + pad(day);

  await runValidation();
  await editor.isReady

  await editor.render(blogData.content);
}