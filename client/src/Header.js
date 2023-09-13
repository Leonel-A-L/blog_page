import React, { useEffect, useState } from 'react';

export default function Header() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/login/profile', {
          credentials: 'include',
        });
        if (response.ok) {
          const userInfo = await response.json();
          setUsername(userInfo.username);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/login/logout', {
        credentials: 'include',
        method: 'POST',
      });

      if (response.ok) {
        console.log('Logout successful');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

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