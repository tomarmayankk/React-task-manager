import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Notes App</h1>
      <p className="text-lg text-gray-600 mb-8">Your personal space to organize and manage notes</p>
      
      <div className="flex space-x-4">
        <Link to = "/Login"
          className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          Login
        </Link>
        <Link to = "/register"
          className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Main;
