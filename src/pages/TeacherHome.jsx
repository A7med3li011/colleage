import { useState, useEffect } from "react";
import { BookOpen, Users, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TeacherHome() {
  // Using state instead of localStorage for compatibility

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Courses</h1>
          <p className="text-gray-600">
            Manage and monitor your teaching assignments
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JSON.parse(localStorage.getItem("courses")).map((course, index) => (
            <div
              key={course.course_id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                {/* Course Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                      Course
                    </span>
                  </div>
                </div>

                {/* Course ID */}
                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Hash className="h-4 w-4 text-gray-500" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Course ID
                    </span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    {course.course_id}
                  </p>
                </div>

                {/* Course Name */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                    {course.course_name}
                  </h3>
                </div>

                {/* Students Count */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">
                      Students Enrolled
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {course.total_students}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                    View Details
                  </button>
                  <button
                    onClick={() =>
                      navigate("/subject", {
                        state: {
                          cId: course.course_id,
                          subject: course.course_name,
                        },
                      })
                    }
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no courses) */}
        {JSON.parse(localStorage.getItem("courses")).length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500">Start by adding your first course.</p>
          </div>
        )}

        {/* Summary Stats */}
        {/* <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {courses.length}
              </div>
              <div className="text-sm text-blue-700">Total Courses</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {courses.reduce(
                  (sum, course) => sum + course.total_students,
                  0
                )}
              </div>
              <div className="text-sm text-green-700">Total Students</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {JSON.parse(localStorage.getItem("courses")).length > 0
                  ? Math.round(
                      JSON.parse(localStorage.getItem("courses")).reduce(
                        (sum, course) => sum + course.total_students,
                        0
                      ) / JSON.parse(localStorage.getItem("courses")).length
                    )
                  : 0}
              </div>
              <div className="text-sm text-purple-700">Avg. Class Size</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
