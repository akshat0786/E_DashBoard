import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  //usind state to store credentials
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //to reload the page and used to check the authorization to go again to signup page after signed up
  const navigate = useNavigate();

  useEffect(()=> {
    const auth = localStorage.getItem('user');
    if(auth)
    {
      navigate('/')
    }
  })

  //fetching register api and storing it into local storage
  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem('user', JSON.stringify(result));
    navigate('/')
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button onClick={collectData} className="form-btn">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
