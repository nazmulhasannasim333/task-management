import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const Home = () => {
    const [allUsers, setAllUsers] = useState([])
    const {user} = useContext(AuthContext)
    const mavigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:5000/users`)
        .then(res => {
            // console.log(res.data);
            setAllUsers(res.data)
        })
    },[])
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        const {title, date, status, useremail, details} = data
        const task = {title, date, status, useremail, details}
        if(user){
            axios.post(`http://localhost:5000/task`, task)
        .then(res => {
            console.log(res.data);
            if(res.data.insertedId){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Task Added',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
        }else{
            mavigate("/login")
        }
      }


    return (
        <div className=" pb-20 pt-10">
      <div className="max-w-6xl lg:mx-auto mx-4 mt-14">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="pt-5">
              <label className="" htmlFor="text">
                Title
              </label>
              <input
                className="w-full text-black p-2 border lg:p-3 rounded-md focus:outline-none"
                {...register("title")}
              />
            </div>
            <div className="pt-5">
              <label className="" htmlFor="email-address">
                Due Date
              </label>
              <input
              type='date'
                className=" w-full text-black border p-2 lg:p-3 rounded-md focus:outline-none"
                {...register("date")}
              />
            </div>
            <div className="pt-5">
              <label className="" htmlFor="text">
                Select Status
              </label>
              <select
                className=" w-full text-black border p-2 lg:p-3 rounded-md focus:outline-none"
                {...register("status")}
              >
                <option disabled selected value="select">Select Status</option>
                <option value="Progress">Progress</option>
                <option value="Not Started">Not Started</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
            <div className="pt-5">
              <label className="" htmlFor="text">
                Select User
              </label>
              <select
                className=" w-full text-black border p-2 lg:p-3 rounded-md focus:outline-none"
                {...register("useremail")}
              >
                <option disabled selected value="">Select User</option>
                {
                    allUsers?.map(singleUser =>  <option key={singleUser._id} value={singleUser?.email}>{singleUser?.email}</option>)
                }
              </select>
            </div>
          </div>
          <div className="pb-8 pt-5">
            <label className="" htmlFor="text">
              Details
            </label>
            <textarea
              className=" w-full text-black border pb-10 lg:pb-20 bg-slate-100 rounded-md focus:outline-none"
              {...register("details")}
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
    );
};

export default Home;