import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

function Register() {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(false);

  const handleSubmit=async (e)=>{
    //to prevent the page from refreshing on submitting the form
e.preventDefault();
try {
  //posting on this url and second parameter is what data we are posting
  const res= await axios.post('/auth/register',{ //'http://localhost:5000/auth/register'
    username,email,password,
  });
  //if there is no error but response
  //then take me to the login page
  res.data &&  window.location.replace("/login");
} catch (err) {
  setError(true);
  
}


  }
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..."
        onChange={(e)=>{setUsername(e.target.value)}} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." 
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." 
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <button className="registerButton" type="submit">Register</button>
      </form>
        <button className="registerLoginButton">
        <Link className="link" to="/login">
                LOGIN
              </Link>
        </button>

        {/* if there is error then show this */}
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
    )
}

export default Register
