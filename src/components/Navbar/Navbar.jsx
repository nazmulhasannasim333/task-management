import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(() => {
      console.log("logout successful");
    });
  };

  return (
    <div className="bg-slate-900 sticky top-0 z-30">
      <div className=" max-w-7xl mx-auto">
        <nav className=" lg:px-20 px-5 flex justify-between items-center text-white">
          <div className="py-5 text-orange-500 font-extrabold text-4xl">
            <Link className="flex items-center " to="/">
              <span>Task Management</span>
            </Link>
          </div>
          <div>
            <ul className="hidden lg:flex items-center space-x-6 font-semibold">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-600"
                      : "hover:text-indigo-600 ease-in duration-200"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mytask"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-600"
                      : "hover:text-indigo-600 ease-in duration-200"
                  }
                >
                  My Task
                </NavLink>
              </li>
           {
            user && 
            <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600"
                  : "hover:text-indigo-600 ease-in duration-200"
              }
            >
              Dashboard
            </NavLink>
          </li>
           }
              {user ? (
                <li>
                  {" "}
                  <Link to="/login">
                    <button onClick={handleLogout} className="bg-indigo-500 text-white px-5 py-2 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">
                      LogOut
                    </button>
                  </Link>
                </li>
              ) : (
                <li>
                  {" "}
                  <Link to="/login">
                    <button className="bg-indigo-500 text-white px-5 py-2 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">
                      Login
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Screen */}
          <div className="lg:hidden cursor-pointer ml-20 z-50">
            <button
              title={!isMenuOpen ? "Open Menu" : "Close Menu"}
              aria-label={!isMenuOpen ? "Open Menu" : "Close Menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {!isMenuOpen ? (
                <FaBars className="h-6 w-6 text-indigo-600" />
              ) : (
                <FaTimes className="h-6 w-6 text-indigo-600" />
              )}
            </button>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden bg-slate-700 h-96 opacity-90 z-30 absolute inset-0">
              <ul className=" grid place-items-center py-20">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-600"
                      : "hover:text-indigo-600 ease-in duration-200"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="my-4">
                <NavLink
                  to="/mytask"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-600"
                      : "hover:text-indigo-600 ease-in duration-200"
                  }
                >
                  My Task
                </NavLink>
              </li>
           {
            user &&
            <li className="mb-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600"
                  : "hover:text-indigo-600 ease-in duration-200"
              }
            >
              Dashboard
            </NavLink>
          </li>
           }
              {user ? (
                <li>
                  {" "}
                  <Link to="/login">
                    <button onClick={handleLogout} className="bg-indigo-500 text-white px-5 py-2 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">
                      LogOut
                    </button>
                  </Link>
                </li>
              ) : (
                <li>
                  {" "}
                  <Link to="/login">
                    <button className="bg-indigo-500 text-white px-5 py-2 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">
                      Login
                    </button>
                  </Link>
                </li>
              )}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
