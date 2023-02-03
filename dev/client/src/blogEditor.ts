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

(async function sanitiseInputs() {
  uriInput.style.borderColor = 'red';
  title.style.borderColor = 'red';

  uriInput.addEventListener('input', () => {
    if (uriInput.value.length < 3 || uriInput.value.length > 50) {
      uriInput.style.borderColor = 'red';
    }
    else {
      uriInput.style.borderColor = 'green';
    }
  });

  title.addEventListener('input', () => {
    if (title.value.length <= 0) {
      title.style.borderColor = 'red';
    }
    else {
      title.style.borderColor = 'green';
    }
  });

  subtitle.addEventListener('input', () => {
    if (subtitle.value.length <= 0) {
      subtitle.style.borderColor = '';
    }
    else {
      subtitle.style.borderColor = 'green';
    }
  });

  createdDate.addEventListener('input', () => {
    if (createdDate.value.length == 0) {
      createdDate.style.borderColor = '';
    }
    if (createdDate.value.length < 10) {
      createdDate.style.borderColor = 'red';
    }
    else if (!dateRegex.test(createdDate.value)) {
      createdDate.style.borderColor = 'red';
    }
    else {
      createdDate.style.borderColor = 'green';
    }
  });

  //create a regex to check for date in formate yyyy-mm-dd
  const dateRegex = new RegExp('^[0-9]{4}/[0-9]{2}/[0-9]{2}$');

})();

const button = document.getElementById('save-button');
if (button != null) button.addEventListener('click', saveBlog);

async function saveBlog() {
  editor.save().then(async (outputData) => {

    
    const blogData = {
      uri: uriInput.value,
      title: title.value,
      subtitle: subtitle.value,
      date: createdDate.value ? createdDate.value : '',
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
      console.log('[' + response.status + '] ' + response.statusText + ': ' + statusMessage);
    });

  }).catch((error) => {
    console.log('Saving failed: ', error);
  });
}