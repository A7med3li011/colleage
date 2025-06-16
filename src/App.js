import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Starter from "./pages/Starter";
import Login from "./pages/Login";

import RegisterCam from "./pages/RegisterCam";
import Home from "./pages/Home";
import axios from "axios";
import { useEffect } from "react";
import TeacherHome from "./pages/TeacherHome";
import EachSub from "./pages/EachSub";
import CamAtten from "./components/CamAtten";
import CuorseDetailsT from "./pages/CuorseDetailsT";
import SessionDetails from "./pages/SessionDetails";
import StudentDetails from "./pages/StudentDetails";

function App() {
  // async function getUser() {
  //   try {
  //     const response = await axios.get(
  //       "https://backendface.fly.dev/api/student/profile",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error(
  //       "Failed to fetch user profile:",
  //       error.response?.data || error.message
  //     );
  //   }
  // }

  useEffect(() => {
    // getUser();
  }, []);
  const routers = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },

        { path: "CamRegister", element: <RegisterCam /> },
        { path: "markAttendance", element: <CamAtten /> },
        { path: "/", element: <Home /> },
        { path: "/Teacher-Home", element: <TeacherHome /> },
        { path: "/student-details", element: <StudentDetails /> },
        { path: "/subject", element: <EachSub /> },
        { path: "/course-details-teacher", element: <CuorseDetailsT /> },
        { path: "/SessionDetails", element: <SessionDetails /> },
      ],
    },
  ]);
  return <RouterProvider router={routers} />;
}

export default App;
