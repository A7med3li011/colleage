import axios from "axios";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { baseUrl } from "../services/apis";
import { toast } from "react-toastify";

const Cam = () => {
  const webcamRef = useRef(null);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [capturedImages, setCapturedImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const maxImages = 3;
  const stepInstructions = [
    "Take a front-facing photo",
    "Turn slightly left and take a photo",
    "Turn slightly right and take a photo",
  ];

  // Convert base64 to File object
  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  // Send all images to the endpoint
  async function sendImages() {
    if (capturedImages.length !== maxImages) {
      toast.error(`Please capture all ${maxImages} images first`);
      return;
    }

    setIsSending(true);
    try {
      const formData = new FormData();

      // Convert base64 images to File objects and append to FormData
      capturedImages.forEach((base64Image, index) => {
        const file = base64ToFile(base64Image, `face-image-${index + 1}.jpg`);
        formData.append("image", file);
      });

      await axios.post(`${baseUrl}student/register_face`, formData, {
        headers: {
          Authorization: `Bearer ${state.response.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("All images sent successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Error sending images:", err);
      toast.error("Something went wrong, please try again");
      resetAll();
    } finally {
      setIsSending(false);
    }
  }

  // Capture image from webcam
  const capture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImages((prev) => [...prev, imageSrc]);

      if (currentStep < maxImages) {
        setCurrentStep((prev) => prev + 1);
      }
      setIsCapturing(false);
    }, 100);
  };

  // Remove a specific image
  const removeImage = (index) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
    if (capturedImages.length <= maxImages) {
      setCurrentStep(Math.min(currentStep, capturedImages.length));
    }
  };

  // Reset all captured images
  const resetAll = () => {
    setCapturedImages([]);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Face Registration
          </h1>
          <p className="text-gray-600 text-lg">
            Please take {maxImages} photos for better face recognition
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">
              {capturedImages.length}/{maxImages}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(capturedImages.length / maxImages) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center">
              {capturedImages.length < maxImages && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Step {currentStep} of {maxImages}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {stepInstructions[currentStep - 1]}
                  </p>
                </>
              )}

              {capturedImages.length < maxImages ? (
                <div className="relative">
                  <div className="relative mx-auto w-80 h-80 rounded-full overflow-hidden shadow-lg border-4 border-blue-200">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{
                        width: 1280,
                        height: 720,
                        facingMode: "user",
                      }}
                      className="w-full h-full object-cover"
                    />
                    {isCapturing && (
                      <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                        <div className="text-blue-600 font-semibold">
                          Capturing...
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={capture}
                    disabled={isCapturing}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    {isCapturing ? "Capturing..." : "📸 Capture Photo"}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-80 h-80 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <div className="text-center">
                      <div className="text-6xl mb-4">✅</div>
                      <h3 className="text-2xl font-bold text-green-600">
                        All Done!
                      </h3>
                      <p className="text-green-700">
                        All photos captured successfully
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Captured Images Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Captured Photos ({capturedImages.length}/{maxImages})
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {capturedImages.map((img, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                >
                  <img
                    src={img}
                    alt={`Captured ${index + 1}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      Photo {index + 1}
                    </p>
                    <p className="text-sm text-gray-500">
                      {stepInstructions[index]}
                    </p>
                  </div>
                  <button
                    onClick={() => removeImage(index)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove this photo"
                  >
                    🗑️
                  </button>
                </div>
              ))}

              {/* Empty slots */}
              {Array.from({ length: maxImages - capturedImages.length }).map(
                (_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg opacity-50"
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <span className="text-gray-400">📷</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-500">
                        Photo {capturedImages.length + index + 1}
                      </p>
                      <p className="text-sm text-gray-400">Not captured yet</p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              {capturedImages.length === maxImages && (
                <button
                  onClick={sendImages}
                  disabled={isSending}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  {isSending ? "Sending..." : "✅ Submit All Photos"}
                </button>
              )}

              {capturedImages.length > 0 && (
                <button
                  onClick={resetAll}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  🔄 Start Over
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            📋 Instructions:
          </h3>
          <ul className="text-blue-700 space-y-2">
            <li>• Ensure good lighting and face the camera directly</li>
            <li>• Remove any accessories that might obstruct your face</li>
            <li>
              • Take photos from slightly different angles for better
              recognition
            </li>
            <li>
              • Make sure your entire face is visible in the circular frame
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cam;
