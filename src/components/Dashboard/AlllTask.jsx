/* eslint-disable react/prop-types */
import axios from 'axios';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AlllTask = ({allTask, refetch}) => {
  

    const handledelete = (task) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`https://task-management-server-gray.vercel.app/deletetask/${task._id}`)
              .then((res) => {
                if (res.data.deletedCount > 0) {
                  refetch();
                  Swal.fire("Deleted!", "Task has been deleted.", "success");
                }
              });
          }
        });
      };



    return (
        <div >
            <div className="overflow-x-auto text-white">
        <table className="table">
          {/* head */}
          <thead className='text-white bg-gradient-to-r from-cyan-500 to-blue-500'>
            <tr>
              <th className="text-lg">#</th>
              <th className="text-lg">Title</th>
              <th className="text-lg">Details</th>
              <th className="text-lg">Due Date</th>
              <th className="text-lg">User Email</th>
              <th className="text-lg">Status</th>
              <th className="text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allTask?.map((task, i) => (
              <tr key={task._id}>
                <th>{i + 1}</th>
                <td>{task?.title}</td>
                <td>{task?.details}</td>
                <td>{task?.date}</td>
                <td>{task?.useremail}</td>
                <td>
                  {task?.status === "Progress" ? (
                    <button className="btn btn-sm bg-purple-700 text-white">
                      {task?.status}
                    </button>
                  ) : task?.status === "Complete" ? (
                    <button className="btn btn-sm bg-green-700 text-white">
                      {task?.status}
                    </button>
                  ) : (
                    <button className="btn btn-sm bg-orange-700 text-white">
                      {task?.status}
                    </button>
                  )}
                </td>
                <td>
                <FaTrash
                      onClick={() => handledelete(task)}
                      title="Delete"
                      className="bg-red-600 text-white p-1 cursor-pointer rounded-sm text-2xl"
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default AlllTask;