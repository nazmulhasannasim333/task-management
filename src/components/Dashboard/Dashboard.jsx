import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import AlllTask from "./AlllTask";
import BarChat from "./BarChat";
import PieChart from "./PieChart";

const Dashboard = () => {
  const [taskStatus, setTaskStatus] = useState([]);
  const [seachText, setsearchText] = useState("");
  const { user, loading } = useContext(AuthContext);
  const [sortTask, setSortTask] = useState('');

  const { data: allTask = [], refetch } = useQuery({
    queryKey: ["allpayment"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axios(`https://task-management-server-gray.vercel.app/alltask`);
      setTaskStatus(response.data);
      return response.data;
    },
  });

  const handleSearchText = () => {
    axios
      .get(`https://task-management-server-gray.vercel.app/gettaskbytitle/${seachText}`)
      .then((res) => {
        console.log(res.data);
        setTaskStatus(res.data);
      });
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchText();
    }
  };





  const progress = taskStatus.filter((s) => s.status === "Progress");
  const complete = taskStatus.filter((s) => s.status === "Complete");
  const notStarted = taskStatus.filter((s) => s.status === "Not Started");
  console.log(progress);
  console.log(complete);
  console.log(notStarted);

  const data = [
    { name: "Complete", value: complete?.length },
    { name: "Progress", value: progress?.length },
    { name: "Not Started", value: notStarted?.length },
  ];

  return (
    <div className="bg-slate-900 h-full pb-10">
      <div className="mx-auto max-w-7xl py-4">
        <div className="lg:flex justify-between">
          <h1 className="text-xl text-white">
            Hi,{" "}
            <span className="text-xl font-semibold text-fuchsia-700">
              {user && user.displayName}
            </span>
          </h1>
          <div className="flex items-center  lg:ms-64 py-4 lg:py-0 lg:w-2/6 w-full">
            <input
              onChange={(e) => setsearchText(e.target.value)}
              onKeyDown={handleKeyPress}
              type="text"
              className="w-3/4 text-black p-2 lg:p-3 rounded-md focus:outline-none border"
              placeholder="Search by task title"
            />
          </div>
          <Link to="/" className="">
            <button className="btn btn-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white normal-case">
              Back to Home
            </button>
          </Link>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 my-12">
          <div className="bg-blue-950 py-10  text-white overflow-hidden">
            <BarChat data={data} />
          </div>
          <div className="bg-gray-700 py-10  text-white">
            <PieChart data={data} />
          </div>
        </div>
        <AlllTask allTask={taskStatus} refetch={refetch} />
      </div>
    </div>
  );
};

export default Dashboard;
