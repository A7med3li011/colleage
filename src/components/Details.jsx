import React from 'react';
import { Users, UserCheck, UserX, Calendar, Clock, Hash } from 'lucide-react';

const Details = ({ data }) => {
  // Return null if no data or empty data
  if (!data || (!data.absent?.length && !data.present?.length)) {
    return null;
  }

  const attendanceData = data;
  const { absent, present, summary } = attendanceData;

  // Format the start time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Calculate attendance percentage
  const attendanceRate = summary.total_students > 0 
    ? ((summary.num_present / summary.total_students) * 100).toFixed(1)
    : 0;

  return (
    <div className="max-w-full mx-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <Hash className="text-blue-600 w-5 h-5" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Course ID</p>
              <p className="text-xl font-bold text-blue-800">{summary.course_id}</p>
            </div>
          </div>
        </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <UserCheck className="text-green-600 w-5 h-5" />
              <div>
                <p className="text-sm text-green-600 font-medium">Present</p>
                <p className="text-xl font-bold text-green-800">{summary.num_present}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center gap-2">
              <UserX className="text-red-600 w-5 h-5" />
              <div>
                <p className="text-sm text-red-600 font-medium">Absent</p>
                <p className="text-xl font-bold text-red-800">{summary.num_absent}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2">
              <Users className="text-purple-600 w-5 h-5" />
              <div>
                <p className="text-sm text-purple-600 font-medium">Total</p>
                <p className="text-xl font-bold text-purple-800">{summary.total_students}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Session Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t pt-4 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Session ID: {summary.session_id}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Start Time: {formatDateTime(summary.start_time)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Attendance Rate: {attendanceRate}%</span>
          </div>
        </div>

      {/* Students Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Present Students */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            <UserCheck className="text-green-600" />
            Present Students ({summary.num_present})
          </h2>
          
          {present.length > 0 ? (
            <div className="space-y-3">
              {present.map((student, index) => (
                <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-green-800">{student.name}</p>
                      <p className="text-sm text-green-600">ID: {student.student_id}</p>
                    </div>
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {student.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p>No students present</p>
            </div>
          )}
        </div>

        {/* Absent Students */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
            <UserX className="text-red-600" />
            Absent Students ({summary.num_absent})
          </h2>
          
          {absent.length > 0 ? (
            <div className="space-y-3">
              {absent.map((student, index) => (
                <div key={index} className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-red-800">{student.name}</p>
                      <p className="text-sm text-red-600">ID: {student.student_id}</p>
                    </div>
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      {student.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <UserX className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p>No students absent</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;