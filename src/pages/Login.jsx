import React, { useState } from "react";

import imageLogin from "../assits/loginImage.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../services/apis";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  async function loginStudent() {
    await axios
      .post(`${baseUrl}/student/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.face_registered) {
          localStorage.clear();
          localStorage.setItem("token", res.data.access_token);
          // localStorage.setItem("email", res.data.student_data.email);
          // localStorage.setItem("name", res.data.student_data.name);
          localStorage.setItem("student_id", res.data.student_id);
          toast.warn("face image is required");

          navigate("/CamRegister", { state: { response: res.data } });
        } else {
          localStorage.clear();
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("email", res.data.student_data.email);
          localStorage.setItem("name", res.data.student_data.name);
          localStorage.setItem("student_id", res.data.student_data.student_id);
          localStorage.setItem(
            "courses",
            JSON.stringify(res.data.student_data.registered_courses)
          );
          navigate("/");
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  }
  async function loginTeacher() {
    await axios
      .post(
        `${baseUrl}teacher/login
`,
        {
          teacher_id: id,
          password,
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.clear();
        localStorage.setItem("TeacherToken", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("Tid", res.data.teacher_id);
        localStorage.setItem("courses", JSON.stringify(res.data.courses));
        navigate("/Teacher-Home");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className=" max-w-6xl mx-auto my-10">
      <h1 className="w-fit px-3 mb-14 py-4 mx-auto text-xl font-semibold tracking-widest">
        HADIR
      </h1>

      <div className="flex items-center    border-b-[#eee] border-b-[1px]  justify-between mx-8 md:mx-0 ">
        <h2 className="font-semiboldtext-lg">Sign In</h2>
        <div className="flex items-center">
          <button
            onClick={() => setRole("student")}
            className={`block  text-white py-2 px-3 md:py-3 md:px-8 ${
              role == "student" ? "bg-black" : "bg-gray-400"
            } `}
          >
            Student
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`block  text-white py-2 px-3 md:py-3 md:px-8 ${
              role == "teacher" ? "bg-black" : "bg-gray-400"
            } `}
          >
            Teacher
          </button>
        </div>
      </div>
      {role == "student" && (
        <form className="flex flex-wrap flex-col-reverse gapy-3 md:flex-row   items-center pt-10">
          <div className=" w-full md:w-2/5">
            <h3 className="w-full font-semibold mb-8 text-center md:text-left my-3 capitalize">
              Sign In With Email Address
            </h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" border-b-[#333] border-b-[1px] block my-8 mx-auto md:mx-0 w-2/3 py-1 px-3 focus:outline-none "
              type="text"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border-b-[#333] border-b-[1px] block my-8 mx-auto md:mx-0 w-2/3 py-1 px-3 focus:outline-none "
              type="password"
              placeholder="Password"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                loginStudent();
              }}
              className="bg-black text-white rounded-xl mx-auto md:mx-0 font-semibold w-1/3 px-5 py-2 block "
            >
              Sign In
            </button>
          </div>
          <div className="w-10/12 md:w-3/5">
            <img className="w-full" src={imageLogin} alt="loginIMage" />
          </div>
        </form>
      )}
      {role == "teacher" && (
        <form className="flex flex-wrap flex-col-reverse gapy-3 md:flex-row   items-center pt-10">
          <div className=" w-full md:w-2/5">
            <h3 className="w-full font-semibold mb-8 text-center md:text-left my-3">
              {" "}
              Sign In With Teacher ID
            </h3>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className=" border-b-[#333] border-b-[1px] block my-8 mx-auto md:mx-0 w-2/3 py-1 px-3 focus:outline-none "
              type="text"
              placeholder="ID"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border-b-[#333] border-b-[1px] block my-8 mx-auto md:mx-0 w-2/3 py-1 px-3 focus:outline-none "
              type="password"
              placeholder="Password"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                loginTeacher();
              }}
              className="bg-black text-white rounded-xl mx-auto md:mx-0 font-semibold w-1/3 px-5 py-2 block "
            >
              Sign In
            </button>
          </div>
          <div className="w-10/12 md:w-3/5">
            <img className="w-full" src={imageLogin} alt="loginIMage" />
          </div>
        </form>
      )}
    </div>
  );
}

/*
 <h2 className='text-center font-semibold my-10 text-lg'>Welcome in our Login page</h2>
         <Cam/>
*/
