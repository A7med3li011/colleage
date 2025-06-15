import React from 'react';
import { Users, UserCheck, UserX, Hash } from 'lucide-react';

const AttendanceDisplay = ({ attendanceData }) => {

  const getStatusColor = (status) => {
    return status === 'present' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getStatusIcon = (status) => {
    return status === 'present' 
      ? <UserCheck className="w-4 h-4" />
      : <UserX className="w-4 h-4" />;
  };

  const attendanceRate = Math.round(
    (attendanceData?.summary?.total_present /
      attendanceData?.summary?.total_registered) *
      100
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Session Attendance
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Hash className="w-4 h-4 mr-1" />
                Course: {attendanceData?.course_id}
              </div>
              <div className="flex items-center">
                <Hash className="w-4 h-4 mr-1" />
                Session: {attendanceData?.session_id}
              </div>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-blue-900">{attendanceData?.summary?.total_registered}</p>
                  <p className="text-xs sm:text-sm text-blue-600">Total Students</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center">
                <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-green-900">{attendanceData?.summary?.total_present}</p>
                  <p className="text-xs sm:text-sm text-green-600">Present</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center">
                <UserX className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mr-2 sm:mr-3 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-red-900">{attendanceData?.summary?.total_absent}</p>
                  <p className="text-xs sm:text-sm text-red-600">Absent</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">%</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-purple-900">{attendanceRate}%</p>
                  <p className="text-xs sm:text-sm text-purple-600">Attendance Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance List */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            Student Attendance Details
          </h2>
          
          <div className="space-y-3">
            {attendanceData?.attendance?.map((student, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-xs sm:text-sm">
                        {student?.name
                          ?.split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{student?.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">ID: {student?.student_id}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center justify-center sm:justify-start space-x-2 px-3 py-1.5 rounded-full border text-xs sm:text-sm ${getStatusColor(student?.status)} flex-shrink-0 w-fit`}>
                    {getStatusIcon(student?.status)}
                    <span className="font-medium capitalize">{student?.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {(!attendanceData?.attendance || attendanceData.attendance.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm sm:text-base">No attendance records found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceDisplay;