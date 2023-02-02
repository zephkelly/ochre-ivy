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

const button = document.getElementById('save-button');
if (button != null) button.addEventListener('click', saveBlog);

async function saveBlog() {
  editor.save().then(async (outputData) => {

    const uri = document.getElementById('uri-input');
    const title = document.getElementById('title-input');
    const subtitle = document.getElementById('subtitle-input');
    const createdDate = document.getElementById('createdDate-input');
    
    const blogData = {
      uri: uri?.textContent,
      title: title?.textContent,
      subtitle: subtitle?.textContent,
      date: createdDate?.textContent,
      content: outputData
    }
    
    const response = await fetch('http://localhost:62264/api/blog', {
      method: 'POST',
      body: JSON.stringify(blogData),
      headers: { 'Content-Type': 'application/json' }
    });

    if (await response.status === 200) {
      console.log('Blog saved ' + response.status + ' ' + response.json());
    } else {
      console.log('Blog save failed ' + response.status + ' ' + response.json());
    }

  }).catch((error) => {
    console.log('Saving failed: ', error);
  });
}