import {useEffect, useState} from 'react'

export default function Header(){
    const [username, setUsername] = useState(null)
    useEffect(() => {
        fetch('http://localhost:8080/login/profile',{
            credentials:'include'
        }).then(response => {
            response.json().then(userInfo => {
                setUsername(userInfo.username);
            })
        })
    },[])

    function logout(){
        fetch('http://localhost:8080/login/logout',{
            credentials: 'include',
            method: 'POST'
        })
    }

    return(
        <header>
            <a href='/' className='logo'>MyBlog</a>
            <nav>
                {username && (
                    <>  
                        <a href='/create'>Create new post</a>    
                        <a onClick={logout}>Logout</a>                    
                    </>
                )}
                {!username && (
                    <>
                         <a href='/login'>Login</a>
                        <a href='/register'>Register</a>
                    </>
                )}
            </nav>
        </header>
    )
}