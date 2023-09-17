import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function Header(){
    const{setUserInfo,userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('http:/localhost:8080/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/login/logout', {
        credentials: 'include',
        method: 'POST',
      });

      if (response.ok) {
        setUserInfo(null)
        console.log('Logout successful');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

const username = userInfo?.username

  return (
    <header>
      <a href='/' className='logo'>
        GUTD
      </a>
      <nav>
        {username ? (
          <>
            <button><a href='/createPost'>Create new post</a></button>
            <button><a  onClick={handleLogout}>Logout</a></button>
          </>
        ) : (
          <>
            <button><a href='/login'>Login</a></button>
            <button><a href='/register'>Register</a></button>
          </>
        )}
      </nav>
    </header>
  );
}