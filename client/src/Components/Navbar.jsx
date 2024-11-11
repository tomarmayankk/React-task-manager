import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };
  const handleSearch = () => {
    //
  };

  return (
    <div className="fixed flex justify-between items-center top-0 h-16 w-full bg-gray-50 shadow-md">
      <div className="m-6">
        <ul className="flex items-center gap-4 font-semibold cursor-pointer">
          <li>Tasks</li>
          <li>Notes</li>
        </ul>
      </div>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
      />
      <div>
        <ProfileInfo onLogout={onLogout} />
      </div>
    </div>
  );
};
export default Navbar;
