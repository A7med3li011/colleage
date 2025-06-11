import React from 'react'
import { Link } from 'react-router-dom'
 import logo from "../assits/logo.jpg"
export default function NavBar() {
  return (
    <div className='flex justify-between items-center  px-3 py-2'>
      <div><img className='w-[50px] h-[50px] rounded-full' src={logo} alt='logo'/> </div>
      <ul className='flex '>
      <li className='py-1 px-3'><Link to={"/home"}></Link>Home</li>
      {/* <li className='py-1 px-3'><Link to={"/register"}>Register</Link></li> */}
        <li className='py-1 px-3'><Link to={"/login"}>Login</Link></li>
      </ul>
    </div>
  )
}
