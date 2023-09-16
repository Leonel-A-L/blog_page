import React, { useState } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom'; 

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],
  ],
};

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'link', 'image'
];

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (file) {
      data.append('file', file); 
    }

    try {
      const response = await fetch('http://localhost:8080/post', {
        method: 'POST',
        body: data,
        credentials: 'include'
      });
      
      if (response.ok) {
        setRedirect(true)
        const result = await response.json();
        // Handle the response/result from the server
        console.log(result);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
      <input type="text" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
      <input type="text" placeholder="Summary" value={summary} onChange={(ev) => setSummary(ev.target.value)} />
      <input type="file" onChange={(ev) => setFile(ev.target.files[0])} /> {/* Use ev.target.files */}
      <ReactQuill value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)} />
      <button style={{ marginTop: '5px' }} type="submit">Create post</button>
    </form>
  );
}