import react from 'react';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; 
import { UserContext } from '../UserContext';

export default function LoginPage() {
    const [username, setUsername] = react.useState('');
    const [password, setPassword] = react.useState('');
    const [redirect, setRedirect] = react.useState(false);
    const {setUserInfo} = useContext(UserContext)
    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then(userInfo => {
               setUserInfo(userInfo)
                setRedirect(true);
            })
        } else {
            alert('Make Sure Username and/or Password Is Correct.');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
            />
            <input
                type="password" // Change the input type to password
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />
            <button>Login</button>
        </form>
    );
}