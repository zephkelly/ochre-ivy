import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import Quote from '@editorjs/quote';
import List from '@editorjs/list';

const editor = new EditorJS({
  holder: 'editorjs',
  minHeight: 120,
  tools: {
    header: Header,
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