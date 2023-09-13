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
        MyBlog
      </a>
      <nav>
        {username ? (
          <>
            <a href='/create'>Create new post</a>
            <a onClick={handleLogout}>Logout</a>
          </>
        ) : (
          <>
            <a href='/login'>Login</a>
            <a href='/register'>Register</a>
          </>
        )}
      </nav>
    </header>
  );
}