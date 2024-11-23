import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = ({userInfo, searchNote}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchNote(searchQuery);
    } else {
      setIsSearch(false);
      getAllNotes(); // Reset to show all notes
    }
  };

  return (
    <div className="fixed flex justify-between items-center top-0 h-16 w-full bg-gray-50 shadow-md">
      <div className="m-6">
        <h3 className="flex items-center gap-4 font-semibold cursor-pointer">
          LOGO
        </h3>
      </div>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
      />
      <div>
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};
export default Navbar;
