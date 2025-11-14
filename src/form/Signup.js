import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signup(){
    const [name,setName]= useState("");
    const [email,setEmail]= useState(""); // added email because API needs it
    const [password,setPassword] = useState("");
    const [confpswd,setConfPswd] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();

    const usersignup = async(e)=>{
        e.preventDefault();
        if(password !== confpswd){
            alert("Passwords do not match");
            return;
        }

        const user = {
            name: name,
            email: email,  // required by API
            password: password,
            password_confirmation: confpswd 
        };

        try {
            const res = await axios.post('https://demo-blog.mashupstack.com/api/register', user);

            setErrorMessage('');
            alert("Signup successful!"|| res.data.message);
            navigate('/login');
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrorMessage(Object.values(err.response.data.errors).join(' '));
            } else {
                setErrorMessage('Failed to connect to API');
            }
        }
    };

    return (
        <div className='signup'>
            <h1>Signup</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={usersignup}>
                <label>Name </label>
                <input type='text' value={name} onChange={e=>setName(e.target.value)} /><br/>

                <label>Email </label>
                <input type='email' value={email} onChange={e=>setEmail(e.target.value)} /><br/>

                <label>Password </label>
                <input type='password' value={password} onChange={e=>setPassword(e.target.value)} /><br/>

                <label>Confirm password </label>
                <input type='password' value={confpswd} onChange={e=>setConfPswd(e.target.value)} /><br/>

                <button type='submit' className='btn btn-danger'>Submit</button>
            </form>
        </div>
    );
}

export default Signup;
