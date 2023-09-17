// import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom'; 

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

export default function EditPost(){

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary)
            })
        })
    },[])

    async function updatePost(ev){
        ev.preventDefault();
        const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('id', id);
    data.set('content', content);
    if (file?.[0]) {
      data.append('file', file?.[0]); 
    }

    try {
      const response = await fetch('http://localhost:8080/post', {
        method: 'PUT',
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
        return <Navigate to={'/post/'+id} />
    }
    return (
        <form onSubmit={updatePost}>
        <input type="text" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
        <input type="text" placeholder="Summary" value={summary} onChange={(ev) => setSummary(ev.target.value)} />
        <input type="file" onChange={(ev) => setFile(ev.target.files)} /> 
        <ReactQuill value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)} />
        <button style={{ marginTop: '5px' }} type="submit">Update Post</button>
        </form>
  )
}