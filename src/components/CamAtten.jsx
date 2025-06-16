import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { baseUrl } from "../services/apis";
import { toast } from "react-toastify";

const CamAtten = () => {
  const webcamRef = useRef(null);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkWifi() {
    await axios
      .post(
        `${baseUrl}student/pre_attend_check/${state?.cId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => {
        // console.log(err.response);
        toast.error(err.response.data.message);
        navigate("/");
      });
  }
  useEffect(() => {
    checkWifi();
  }, []);
  // Function to convert base64 to File object
  const base64ToFile = (base64String, fileName) => {
    // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
    const base64Data = base64String.split(",")[1];

    // Convert base64 to binary
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create File object
    return new File([bytes], fileName, { type: "image/jpeg" });
  };

  async function sendImage(base64Image) {
    setLoading(true);
    try {
      // Convert base64 to File
      const imageFile = base64ToFile(base64Image, "attendance-photo.jpg");

      // Create FormData
      const formData = new FormData();
      formData.append("image", imageFile);

      await axios.post(`${baseUrl}student/attend/${state?.cId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Attendance marked successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Mark Attendance
          </h2>
          <p className="text-gray-600">
            {!capturedImage
              ? "Position yourself in the camera frame"
              : "Review your photo"}
          </p>
        </div>

        {!capturedImage ? (
          /* Webcam View */
          <div className="space-y-6">
            <div className="relative">
              <div
                className="relative overflow-hidden rounded-full mx-auto"
                style={{ width: "280px", height: "280px" }}
              >
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: 1280,
                    height: 720,
                    facingMode: "user",
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay ring */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-opacity-50"></div>
              </div>

              {/* Camera guidelines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 border-2 border-dashed border-white opacity-60 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-3 py-1 rounded-full">
                    Center your face
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">
                    Tips for better attendance marking:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-blue-600">
                    <li>Ensure good lighting on your face</li>
                    <li>Look directly at the camera</li>
                    <li>Remove any face coverings if possible</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Capture Button */}
            <button
              onClick={capture}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Capture Photo</span>
              </div>
            </button>
          </div>
        ) : (
          /* Captured Image View */
          <div className="space-y-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={capturedImage}
                  alt="Captured for attendance"
                  className="w-72 h-72 object-cover rounded-full border-4 border-gray-200 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => sendImage(capturedImage)}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 disabled:to-green-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Marking Attendance...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span>Submit Attendance</span>
                  </div>
                )}
              </button>

              <button
                onClick={retakePhoto}
                disabled={loading}
                className="w-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 disabled:text-gray-400 font-semibold py-3 px-6 rounded-xl border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Retake Photo</span>
                </div>
              </button>
            </div>

            {/* Course Info */}
            {state?.cId && (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">
                  Course ID:{" "}
                  <span className="font-semibold text-gray-900">
                    {state.cId}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors duration-200"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CamAtten;
