import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);

    // save the auth-token and redirect
    if (json.success){
        // save the auth-token and redirect
        localStorage.setItem('token',json.authtoken);
        props.showAlert("Account Created Successfully", "success");
        navigate("/");
       

    }
    else{
        props.showAlert("Invalid Credentials ", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mb-2">
     
        <h2 className="my-3">Create an account to use iNotebook </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            placeholder="Enter Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={onChange}
            placeholder="Password"
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            onChange={onChange}
            placeholder="confirm Password"
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
