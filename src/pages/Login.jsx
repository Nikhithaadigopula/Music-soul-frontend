import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import {AiOutlineLogin } from 'react-icons/ai'
import bg from "../assets/bg8.jpg"

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  let __URL__ ;
  if ( document.domain === "localhost" ) {
    __URL__ = "https://music-soul-backend.onrender.com";
  } else {
    __URL__ = "";
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const res = await fetch(`${__URL__}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(inputs)
    } )
    const data = await res.json();

    if(data.status === "success"){
      localStorage.setItem("access_token", data.token);
      alert("Login Successful");
      navigate('/')
    }else{
      alert(data.message || "Something went wrong");
    }
  }

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center flex-col"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
    <div className="w-full h-screen flex justify-center items-center ">
      <form
        className=" bg-white flex flex-col px-5 py-10
      shadow-2xl rounded-xl"
      onSubmit={handleSubmit}
      >
        <h1 className="text-center text-sky-800 text-2xl -mt-5 underline underline-offset-2 font-mono">
          Login
        </h1>
        <div className="flex flex-col space-y-5 p-5 rounded-xl">
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="border border-b-blue-900 outline-none rounded-sm placeholder:px-1 h-8"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="border border-b-blue-900 outline-none rounded-sm placeholder:px-1 h-8"
            onChange={handleChange}
          />
          <button className="flex justify-center items-center space-x-2 bg-sky-800 text-white py-1 rounded-sm shadow-md hover:bg-black hover:tracking-wider font-mono">
            <span>Login</span><AiOutlineLogin/>
          </button>
          <div className="flex justify-center items-center space-x-2">
            <p>Forgot Password?</p>
            <Link to="/register" className="text-sky-900">Register</Link>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;