import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import imageLogin from "../assits/loginImage.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../services/apis";
import { toast } from "react-toastify";
import logo2 from "../assits/a.png";
export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      .catch((err) => toast.error(err.response.data.message));
  }

  async function loginTeacher() {
    await axios
      .post(`${baseUrl}teacher/login`, {
        teacher_id: id,
        password,
      })
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
      .catch((err) => toast.error(err.response.data.message));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
        </div>
        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-wider mb-4">
            HADIR
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">
            Welcome back! Please sign in to your account
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 backdrop-blur-sm px-8 py-8 border-b border-gray-200/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                Sign In
              </h2>
              <div className="flex bg-white/70 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/30">
                <button
                  onClick={() => setRole("student")}
                  className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    role === "student"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setRole("teacher")}
                  className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    role === "teacher"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                  }`}
                >
                  Teacher
                </button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-10">
            {role === "student" && (
              <form className="flex flex-col lg:flex-row items-center gap-16">
                {/* Form Section */}
                <div className="w-full lg:w-2/5 space-y-8">
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Student Portal
                    </h3>
                    <p className="text-gray-600">
                      Sign in with your email address
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="relative group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-700 bg-white/50 backdrop-blur-sm group-hover:bg-white/80"
                        type="email"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-5 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-700 bg-white/50 backdrop-blur-sm group-hover:bg-white/80"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        loginStudent();
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                    >
                      Sign In
                    </button>
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-full lg:w-3/5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                      <img
                        className="w-full h-auto object-cover"
                        src={imageLogin}
                        alt="Login illustration"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {role === "teacher" && (
              <form className="flex flex-col lg:flex-row items-center gap-16">
                {/* Form Section */}
                <div className="w-full lg:w-2/5 space-y-8">
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Teacher Portal
                    </h3>
                    <p className="text-gray-600">
                      Sign in with your teacher ID
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="relative group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Teacher ID
                      </label>
                      <input
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-700 bg-white/50 backdrop-blur-sm group-hover:bg-white/80"
                        type="text"
                        placeholder="Enter your teacher ID"
                      />
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-5 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-700 bg-white/50 backdrop-blur-sm group-hover:bg-white/80"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        loginTeacher();
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                    >
                      Sign In
                    </button>
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-full lg:w-3/5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                      <img
                        className="w-full h-auto object-cover"
                        src={imageLogin}
                        alt="Login illustration"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
