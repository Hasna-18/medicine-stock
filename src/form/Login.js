import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const loginsetup = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://demo-blog.mashupstack.com/api/login', {
                email,
                password,
            });

            // store token + user info
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', res.data.user?.name || email);

            setErrorMessage('');
            alert("Login successful!");
            navigate('/mainpage');
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrorMessage(Object.values(err.response.data.errors).join(' '));
            } else {
                setErrorMessage(err.response?.data?.message || 'Login failed');
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={loginsetup}>
                <label>Email </label>
                <input 
                    type='email' 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                /><br/>

                <label>Password </label>
                <input 
                    type='password' 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                /><br/>

                <button type='submit' className='btn btn-danger'>Submit</button>
            </form>
        </div>
    );
};

export default Login;
