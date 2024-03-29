/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
    
    const {loginUser, googleLogin} = useContext(AuthContext);
  const [showError, setShowError] = useState("");
  const navigate = useNavigate();


  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log( email, password);

    setShowError("")

    loginUser(email, password)
    .then(result => {
      const loginUser = result.user;
      console.log(loginUser);
      form.reset();
      navigate("/")
    })
    .catch(error => {
      console.log(error);
      setShowError(error.message)
    })
    
  }

  const handleGoogleLogin = () => {
    googleLogin()
    .then(result => {
      const signinGogle = result.user;


      axios.post(`https://task-management-server-gray.vercel.app/user`, {
        name: signinGogle.displayName,
         email: signinGogle.email,
        date: new Date()
      })
      .then(res => {
        console.log(res.data);
        if(res.data.insertedId){
            navigate("/")
            Swal.fire({
                title: "Success!",
                text: "Welcome to Task management",
                icon: "success",
                confirmButtonText: "Ok",
              });
        }
      })



      navigate("/")
    })
    .catch(error => console.log(error))
  }
    


    return (
        <div className=' py-10'>
       <div className="max-w-xl lg:mx-auto mx-4 my-12">
      <div className="lg:p-12 p-5 w-full bg-white rounded-lg shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login your account
        </h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="pt-5">
              <label className="text-black"  htmlFor="email-address" >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-black bg-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                placeholder="Enter Email address"
              />
            </div>
            <div className="pt-5">
              <label className="text-black"  htmlFor="password" >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-black bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                placeholder="Enter Password"
              />
            </div>
          </div>
            
            <div className="text-sm">
              <Link
                to="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="text-center text-red-500 pt-5">{showError && showError}</p>
        <p className="text-center pt-5 text-black">Don't have an account? <Link className="text-indigo-500" to="/register">Register</Link></p>
        <div className="text-center my-4">
        <span className="content-style text-black">Or</span>
      </div>
        <button onClick={handleGoogleLogin} className="btn btn-outline  w-full mt-5"><FaGoogle className="text-green-500 text-4xl pe-3"/> <span className="text-black">Login with Google</span></button>
        
      </div>
    </div>
        </div>
    );
};

export default Login;