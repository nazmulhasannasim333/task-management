import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateTask = () => {
    const loadedTask = useLoaderData()
    console.log(loadedTask);
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        const {title, date, status,  details} = data
        const task = {title, date, status, details}
        axios.put(`https://task-management-server-gray.vercel.app/mytask/${loadedTask._id}`, task)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Task Updated',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate("/mytask")
            }
        })
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
              defaultValue={loadedTask.title}
                className="w-full text-black p-2 border lg:p-3 rounded-md focus:outline-none"
                {...register("title")}
              />
            </div>
            <div className="pt-5">
              <label className="" htmlFor="email-address">
                Due Date
              </label>
              <input
              defaultValue={loadedTask.date}
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
              defaultValue={loadedTask.status}
                className=" w-full text-black border p-2 lg:p-3 rounded-md focus:outline-none"
                {...register("status")}
              >
                <option value="Progress">Progress</option>
                <option value="Not Started">Not Started</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
            <div className="pt-5">
              <label className="" htmlFor="text">
                User Email
              </label>
              <input
              defaultValue={loadedTask.useremail}
              readOnly
                className="w-full text-black p-2 border lg:p-3 rounded-md focus:outline-none"
                {...register("user")}
              />
            </div>
          </div>
          <div className="pb-8 pt-5">
            <label className="" htmlFor="text">
              Details
            </label>
            <textarea
            defaultValue={loadedTask.details}
              className=" w-full text-black border pb-10 lg:pb-20 bg-slate-100 rounded-md focus:outline-none"
              {...register("details")}
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
    );
};

export default UpdateTask;