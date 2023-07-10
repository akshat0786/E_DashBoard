import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  //using hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //use effect hook to cannot navigate to login page after loggedin
  useEffect(()=> {
    const auth = localStorage.getItem('user');
    if(auth) {
        navigate('/')
    }
  })


  //fetching api thorugh post method storing result in local storage else alert invalid credentials
  const handleLogin = async () => {
    console.warn("email, password", email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    });

    result = await result.json();
    console.warn(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <div className="register">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Passsword"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin} className="form-btn">
        Login
      </button>
    </div>
  );
};

export default Login;
