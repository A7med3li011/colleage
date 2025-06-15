import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../services/apis";
import { useEffect, useState } from "react";
import { BookOpen, Hash, Users } from "lucide-react";
import SessionDisplay from "./SessionDisplay";

export default function CuorseDetailsT() {
  const location = useLocation();

  const { state } = location;
  const [courseData, setCData] = useState({});
  const [seassions, setSeassions] = useState([]);
  console.log(state);

  async function courseSummary() {
    await axios
      .get(
        `${baseUrl}teacher/course/${state.cId}/summary`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TeacherToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => setCData(res.data))
      .catch((err) => console.log(err));
  }
  async function courseDetails() {
    await axios
      .get(
        `${baseUrl}teacher/course/${state.cId}/sessions`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TeacherToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => setSeassions(res.data.sessions))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    courseSummary();
    courseDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Course Information
            </h1>
            <p className="text-gray-600">Course details and enrollment data</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Course ID Card */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    Course ID
                  </p>
                  <p className="text-2xl font-bold">{courseData?.course_id}</p>
                </div>
                <Hash className="w-8 h-8 text-purple-200" />
              </div>
            </div>

            {/* Course Name Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Course Name
                  </p>
                  <p className="text-2xl font-bold capitalize">
                    {courseData?.course_name}
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-200" />
              </div>
            </div>

            {/* Students Count Card */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Registered Students
                  </p>
                  <p className="text-2xl font-bold">
                    {courseData?.registered_students_count}
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-200" />
              </div>
            </div>
          </div>

          {/* Detailed Information Section */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Course Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">
                  Course Identifier:
                </span>
                <span className="text-gray-600">#{courseData?.course_id}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Course Title:</span>
                <span className="text-gray-600 capitalize">
                  {courseData?.course_name}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-700">
                  Total Enrollments:
                </span>
                <span className="text-gray-600">
                  {courseData?.registered_students_count} students
                </span>
              </div>
            </div>
          </div>
          {seassions.length && (
            <div className="mt-10">
              <SessionDisplay data={seassions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
