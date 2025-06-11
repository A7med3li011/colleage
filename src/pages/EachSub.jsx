import { useEffect, useState } from "react";
import { Play, Square, Clock, Users, BookOpen } from "lucide-react";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../services/apis";
import axios from "axios";
import { toast } from "react-toastify";

export default function EachSub() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(0);

  // Update session duration every second when active
  useState(() => {
    let interval;
    if (isSessionActive && sessionStartTime) {
      interval = setInterval(() => {
        setSessionDuration(Math.floor((Date.now() - sessionStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, sessionStartTime]);

  const handleStartSession = async () => {
    setIsSessionActive(true);
    setSessionStartTime(Date.now());
    setSessionDuration(0);
    await startSession();
  };

  const handleEndSession = async () => {
    setIsSessionActive(false);
    setSessionStartTime(null);
    setSessionDuration(0);
    await endSession();
  };

  const location = useLocation();
  const { state } = location;
  async function startSession() {
    await axios
      .post(
        `${baseUrl}api/teacher/start_session`,
        {
          course_id: `${state.cId}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TeacherToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Attendance session started");
      })
      .catch((err) => console.log(err));
  }
  //   async function statuss() {
  //     await axios
  //       .get(
  //         `${baseUrl}api/teacher/verification_stats`,

  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("TeacherToken")}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //         // toast.success("Attendance session started");
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   useEffect(() => {
  //     statuss();
  //   }, []);
  async function endSession() {
    await axios
      .post(
        `${baseUrl}api/teacher/end_session`,
        {
          course_id: `${state.cId}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TeacherToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Attendance session ended");
      })
      .catch((err) => console.log(err));
  }

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const myCourse = JSON.parse(localStorage.getItem("courses")).find(
    (ele) => ele.course_id == state.cId
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Course Session
          </h1>
          <p className="text-gray-600">Manage your teaching session</p>
        </div>

        {/* Session Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border border-gray-100">
          <div className="text-center">
            {/* Status Indicator */}
            <div className="mb-6">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  isSessionActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    isSessionActive ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
                {isSessionActive ? "Session Active" : "Session Inactive"}
              </div>
            </div>

            {/* Session Timer */}
            {isSessionActive && (
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-2 text-3xl font-bold text-blue-600">
                  <Clock className="h-8 w-8" />
                  <span>{formatDuration(sessionDuration)}</span>
                </div>
                <p className="text-gray-500 mt-2">Session Duration</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              {!isSessionActive ? (
                <button
                  onClick={handleStartSession}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Play className="h-5 w-5" />
                  <span>Start Session</span>
                </button>
              ) : (
                <button
                  onClick={handleEndSession}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Square className="h-5 w-5" />
                  <span>End Session</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Course Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Course Details
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Course ID:</span> {state.cId}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Subject:</span> {state.subject}
              </p>
            </div>
          </div>

          {/* <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Attendance
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">
                  Expected: {myCourse.total_students || 0}
                </span>{" "}
                 students
              </p>
              <p className="text-gray-600">
                <span className="font-medium">
                  Present: {myCourse.verified_students || 0} students
                </span>
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Attendance Rate:</span>{" "}
                {isSessionActive ? "93%" : "--"}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
