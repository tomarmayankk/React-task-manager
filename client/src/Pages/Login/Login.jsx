import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!password){
      setError("Please enter a password");
      return;
    }
    setError("")
    try {
      const response = await axiosInstance.post("/login", {email: email, password: password})
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home")
      }
    }
    catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else {
        setError("an unexpected error occured")
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) =>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) =>setPassword(e.target.value)}
            />
          </div>
          {error && <p className='text-sm text-red-600'>{error}</p>}
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Not registered yet?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Go to Register page
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
