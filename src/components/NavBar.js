import React from "react";
import { Link } from "react-router-dom";
import logo from "../assits/logo.jpg";
import logo2 from "../assits/a.png";
export default function NavBar() {
  return (
    <div className="flex justify-between items-center  px-3 py-2">
      <div>
        <img
          className="w-[90px] h-[70px] rounded-full"
          src={logo2}
          alt="logo"
        />{" "}
      </div>
      <ul className="flex ">
        {/* <li className='py-1 px-3'><Link to={"/register"}>Register</Link></li> */}
        {!localStorage.getItem("TeacherToken") &&
        !localStorage.getItem("token") ? (
          <li className="py-1 px-3">
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li
            className="py-1 px-3 cursor-pointer"
            onClick={() => {
              localStorage.clear();

              window.location.href = "/login"; // or use navigate from react-router
            }}
          >
            Logout
          </li>
        )}
      </ul>
    </div>
  );
}
