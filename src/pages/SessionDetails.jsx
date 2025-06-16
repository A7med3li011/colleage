import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../services/apis";
import { useEffect, useState } from "react";
import {
  Users,
  UserX,
  UserCheck,
  Calendar,
  BookOpen,
  Loader2,
} from "lucide-react";

export default function SessionDetails() {
  const location = useLocation();
  const { state } = location;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flag, setflag] = useState(false);

  async function getdata() {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}teacher/course/${state.course_id}/sessions/${state.sessionId}/details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TeacherToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  }
  async function updateAttendance(id) {
    try {
      setLoading(true);
      const response = await axios.put(
        `${baseUrl}teacher/course/${state.course_id}/sessions/${state.sessionId}/attendance/toggle`,
        {
          student_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TeacherToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
      setError("Failed to load attendance data");
    } finally {
      setLoading(false);
      setflag(true);
    }
  }

  useEffect(() => {
    if (state?.course_id && state?.sessionId) {
      getdata();
    }
  }, [flag]);

  const getStatusColor = (status) => {
    return status === "present"
      ? "text-green-600 bg-green-50"
      : "text-red-600 bg-red-50";
  };

  const getStatusIcon = (status) => {
    return status === "present" ? (
      <UserCheck className="w-4 h-4" />
    ) : (
      <UserX className="w-4 h-4" />
    );
  };

  // Safe calculation for attendance rate
  const attendanceRate = data?.summary?.total_registered
    ? (
        (data.summary.total_present / data.summary.total_registered) *
        100
      ).toFixed(1)
    : "0.0";

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Loading attendance data...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-600 text-lg font-medium mb-2">{error}</div>
            <button
              onClick={getdata}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!data || !data.summary) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center text-gray-600">
          No attendance data available
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Attendance Report
        </h1>
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Course ID: {data.course_id || "N/A"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Session: {data.session_id || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Total Students
              </p>
              <p className="text-2xl font-bold text-blue-900">
                {data.summary?.total_registered || 0}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Present</p>
              <p className="text-2xl font-bold text-green-900">
                {data.summary?.total_present || 0}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Absent</p>
              <p className="text-2xl font-bold text-red-900">
                {data.summary?.total_absent || 0}
              </p>
            </div>
            <UserX className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Attendance Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {attendanceRate}%
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Student List */}
      {data.attendance && data.attendance.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Student Attendance
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {data.attendance.map((student, index) => (
              <div
                key={student.student_id || index}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {student.name
                            ? student.name.charAt(0).toUpperCase()
                            : "?"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {student.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500">
                        ID: {student.student_id || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => updateAttendance(student.student_id)}
                  >
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        student.status
                      )}`}
                    >
                      {getStatusIcon(student.status)}
                      <span className="capitalize">
                        {student.status || "unknown"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">No student attendance data available</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Generated on {new Date().toLocaleDateString()} at{" "}
        {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}
