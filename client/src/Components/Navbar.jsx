import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";

const Navbar = ({userInfo}) => {

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="fixed flex justify-between items-center top-0 h-16 w-full bg-gray-50 shadow-md">
      <div className="m-6">
        <h3 className="flex items-center gap-4 font-semibold cursor-pointer">
          QUICK-NOTES
        </h3>
      </div>
      <div>
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};
export default Navbar;
