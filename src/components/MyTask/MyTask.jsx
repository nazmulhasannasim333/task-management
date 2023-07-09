import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const MyTask = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: myTask = [], refetch } = useQuery({
    queryKey: ["allpayment"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axios(
        `https://task-management-server-gray.vercel.app/mytask/${user?.email}`
      );
      console.log(response.data);
      return response.data;
    },
  });

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
    <div className="max-w-6xl lg:mx-auto mx-4 mt-14">
      <h1 className="text-center text-2xl my-12 font-semibold">My Task</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
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
            {myTask?.map((task, i) => (
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
                  <div className="flex gap-4">
                    <Link to={`/update/${task._id}`}>
                      <FaPen
                        title="Update"
                        className="bg-green-600 text-white p-1 cursor-pointer rounded-sm text-2xl"
                      />
                    </Link>
                    <FaTrash
                      onClick={() => handledelete(task)}
                      title="Delete"
                      className="bg-red-600 text-white p-1 cursor-pointer rounded-sm text-2xl"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTask;
