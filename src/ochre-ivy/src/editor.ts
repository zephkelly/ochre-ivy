import EditorJS from '../node_modules/@editorjs/editorjs';

const editor = new EditorJS({
  minHeight : 0
});

if (editor) {
  console.log('Editor is ready');
}