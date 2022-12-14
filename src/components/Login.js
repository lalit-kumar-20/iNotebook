import React, { useState} from "react";
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
       
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success){
        // save the auth-token and redirect
        localStorage.setItem('token',json.authtoken);
        props.showAlert("Logged In Successfully", "success");
        navigate("/");
       
    }
    else{
      props.showAlert("Invalid Details", "danger");
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mb-3">
      <h2 className="my-3">Login to continue iNotebook </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            id="email"
            name="email"
            onChange={onchange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            name="password"
            id="password"
            onChange={onchange}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
