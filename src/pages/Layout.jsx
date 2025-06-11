import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <div className=" p-6">
      <NavBar />
      <main className="max-w-6xl mx-auto ">
        <Outlet />
      </main>
    </div>
  );
}
