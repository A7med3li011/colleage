import axios from "axios";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { baseUrl } from "../services/apis";
import { toast } from "react-toastify";

const Cam = () => {
  const webcamRef = useRef(null); // Reference to the webcam
  const location = useLocation();
  const { state } = location;
  console.log(state.response);
  const navigate = useNavigate();

  const [capturedImage, setCapturedImage] = useState(null); // Store the captured image

  // Convert base64 to File object
  const base64ToFile = (base64String, filename) => {
    // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
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

  async function sendImage(img) {
    try {
      // Convert base64 to File
      const file = base64ToFile(img, "captured-image.jpg");

      // Create FormData
      const formData = new FormData();
      formData.append("image", file);
      console.log(file);
      await axios.post(`${baseUrl}api/student/register-face`, formData, {
        headers: {
          Authorization: `Bearer ${state.response.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image sent successfully");
      navigate("/login");
    } catch (err) {
      console.error("Error sending image:", err);
      toast.error("Something went wrong, please send image again");
    }
  }

  // Capture the screenshot from the webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  return (
    <div className="text-center w-[300px] mx-auto rounded-full">
      {!capturedImage ? (
        <div className="">
          {/* Render Webcam if no captured image */}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user",
            }}
            style={{
              borderRadius: "50%", // Makes it circular
              width: "300px", // Adjust size as needed
              height: "300px",
              objectFit: "cover", // Ensures video fits inside the circle
              border: " solid #ccc", // Optional border for aesthetics
            }}
          />
          <button
            onClick={capture}
            className="bg-sky-700 text-white rounded-lg py-1 px-3 mt-5"
          >
            Capture Photo
          </button>
        </div>
      ) : (
        <div className="rounded-full px-3">
          <h3>Captured Image:</h3>
          <img
            src={capturedImage}
            alt="Captured"
            className="rounded-full w-[300px] h-[300px] object-cover"
          />
          <button
            onClick={() => sendImage(capturedImage)}
            className="bg-black text-white py-2 px-4 block rounded-lg mx-auto my-5"
          >
            Send
          </button>
          <button
            onClick={() => setCapturedImage(null)}
            className="bg-black text-white py-2 px-4 block rounded-lg mx-auto my-5"
          >
            Retake
          </button>
        </div>
      )}
    </div>
  );
};

export default Cam;
