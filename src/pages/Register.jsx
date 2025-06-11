import React from 'react'
import imageLogin from "../assits/loginImage.jpg"
import { useNavigate } from 'react-router-dom'
export default function Register() {
  const navigate = useNavigate()
  
  return (
    <div className=" max-w-6xl mx-auto my-10">
    <h1 className="w-fit px-3 mb-14 py-4 mx-auto text-xl font-semibold tracking-widest">
      HADIR
    </h1> 
    <h2 className=" tracking-widest font-semibold mb-4 border-b-[#eee] border-b-[1px] py-2 text-lg">
      Create An Account
    </h2>
    <form className="flex flex-wrap   items-center pt-10">
    <div className=" w-2/5">
    <h3 className="w-full font-semibold mb-8">SIGN UP WITH EMAIL ADDRESS</h3>
        <input
          className=" border-b-[#333] border-b-[1px] block my-8 w-2/3 py-1 px-3 focus:outline-none "
          type="text"
          placeholder="Full Name"
        />
        <input
          className=" border-b-[#333] border-b-[1px] block my-8 w-2/3 py-1 px-3 focus:outline-none "
          type="text"
          placeholder="Email Address"
        />
        <input
          className=" border-b-[#333] border-b-[1px] block my-8 w-2/3 py-1 px-3 focus:outline-none "
          type="password"
          placeholder="Password"
        />
        <input
          className=" border-b-[#333] border-b-[1px] block my-8 w-2/3 py-1 px-3 focus:outline-none "
          type="text"
          placeholder="Phone"
        />
        <select className=" border-b-[#333] border-b-[1px] block my-8 w-2/3 py-1 px-3 focus:outline-none ">
          <option value="male" >Male</option>
          <option value="female">female</option>
        </select>
        <button onClick={()=>navigate("/CamRegister")} className="bg-black text-white rounded-xl font-semibold w-1/3 px-5 py-2 block ">
          continue
        </button>
      </div>
      <div className="w-3/5">
        <img className="w-full" src={imageLogin} alt="loginIMage"/>
      </div>
    </form>
  </div>
  )
}
