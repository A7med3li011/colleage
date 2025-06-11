import React from "react";
import image from "../assits/start.jpg";
import { useNavigate } from "react-router-dom";

export default function Starter() {
  const navigate = useNavigate()
  return (
    <div className="flex lg:flex-row flex-col-reverse   justify-center gap-x-10 mx-20  px-12 py-8 items-center bg-[#eee] mt-20">
      <div className="  py-5 px-3 w-[400px]">
        <h2 className="text-lg font-semibold mb-3">Face Recognition</h2>
        <p className="text-sm">
          lorem lorem lorem loremlorem loremloremloremlorem lorem loremlorem
          loremloremloremlorem lorem loremlorem loremloremloremlorem lorem
          loremlorem loremloremloremlorem lorem loremlorem loremloremloremlorem
          lorem loremlorem loremloremloremlorem lorem loremlorem loremlorem
          lorem loremlorem lorem lorem loremlorem loremloremloremlorem lorem
          loremloremlorem lorem lorem loremlorem loremloremloremlorem lorem
          loremlorem loremloremloremlorem lorem
        </p>
        <button  onClick={()=>navigate("/login")} className="bg-sky-700 hover:bg-sky-600  transition-all duration-75 text-white rounded-lg px-3 py-1 block mx-auto mt-10 font-semibold text-lg">Get Start</button>
      </div>
      <div className="  ">
        <img src={image} className="h-[300px] w-[400px]" alt="start" />
      </div>
    </div>
  );
}
