import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../components/Dashboard/Dashboard";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import MyTask from "../components/MyTask/MyTask";
import Register from "../components/Register/Register";
import UpdateTask from "../components/UpdateTask/UpdateTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/mytask",
        element: <MyTask />,
      },
      {
        path: "/update/:id",
        element: <UpdateTask />,
        loader: ({params}) => fetch(`https://task-management-server-gray.vercel.app/alltask/${params.id}`)
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
export default router;
