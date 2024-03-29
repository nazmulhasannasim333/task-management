import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
  const {createUser, profileUpdate} = useContext(AuthContext);
  const [showError, setShowError] = useState("")
  const navigate = useNavigate();


  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name,  email, password);

    setShowError("")

    axios.post(`https://task-management-server-gray.vercel.app/user`, {
        name,
        email,
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

    createUser(email, password)
    .then(result => {
      const signUpUser = result.user;
      console.log(signUpUser);
      form.reset();

      profileUpdate(name)
      .then(()=> {
        console.log("profile updated");
      })
      .catch(error => console.log(error))
    })

    .catch(error => {
      console.log(error);
      setShowError(error.message)
    })

  }

    return (
        <div className='900 py-10'>
        <div className="max-w-xl lg:mx-auto mx-4 my-12">
      <div className="lg:p-12 p-5 w-full bg-white rounded-lg shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register your account
        </h2>
        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="pt-5">
              <label className="text-black"  htmlFor="email-address" >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-black bg-white  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                placeholder="Enter your name"
              />
            </div>
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
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-black bg-white  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                placeholder="Enter Email address"
              />
            </div>
            <div className="pt-5">
              <label className="text-black" htmlFor="password" >
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
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
          <p className="text-center text-red-500 pt-5">{showError && showError}</p>
        <p className="text-center pt-5 text-black">Already have an account? <Link className="text-indigo-500" to="/login">Login</Link></p>
      </div>
    </div>
    </div>
    );
};

export default Register;