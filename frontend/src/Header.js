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
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-_xNd23VMqwIsF1mg3bp0-LT1eMOxPOXgqQ&usqp=CAU' className='Blog-Logo' />
      </a>
      <nav>
        {username ? (
          <>
            <button className='buttons'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-22 1 65 20" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
              <a href='/createPost'>Create new post</a>
            </button>
            
            <button className='buttons'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-21 2 65 20" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <a  onClick={handleLogout}>Logout</a>
            </button>
          </>
        ) : (
          <>
            <button className='buttons'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-9 2 40 20" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <a href='/login'>Login</a>
            </button>
            
            <button className='buttons'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-12 2 45 20" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
              <a href='/register'>Register</a>
            </button>
          </>
        )}
      </nav>
    </header>
  );
}