import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import Quote from '@editorjs/quote';
import List from '@editorjs/list';

const editor = new EditorJS({
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
        endpoints: {
          byFile: 'http://localhost:62264/api/blog/imageupload', // Your backend file uploader endpoint
        }
      }
    }
  },
});

if (editor) {
  console.log('Editor is ready');
}

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

const button = document.getElementById('save-button');
if (button != null) button.addEventListener('click', saveBlog);

(async function sanitiseInputs() {  
  runValidation();

  subtitle.addEventListener('input', validateSubtitle);
  createdDate.addEventListener('input', validateDate);
  uriInput.addEventListener('input', validateUri);
  title.addEventListener('input', validateTitle);
  
  tagsInput.addEventListener('input', validateTags);
  
})();

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
  editor.save().then(async (outputData) => {

    let coverImage = null;
    let description = null;

    outputData.blocks.map(block => {
      if (block.type == 'image') {
        coverImage = block.data.file.url;
        return;
      }
    });

    outputData.blocks.map(block => {
      if (block.type == 'paragraph') {
        description = block.data.text;
        return;
      }
    });

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
    
    const response = await fetch('http://localhost:62264/api/blog', {
      method: 'POST',
      body: JSON.stringify(blogData),
      headers: { 'Content-Type': 'application/json' }
    });

    //read body from response ReadableStream
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

        runValidation();
      }
      else {
        postResponse.innerText = 'Blog posting failed: ' + statusMessage;
        postResponse.style.color = 'var(--accent-color-secondary)';
      }

      console.log('[' + response.status + '] ' + response.statusText + ': ' + statusMessage);
    });

  }).catch((error) => {
    console.log('Saving failed: ', error);
  });
}