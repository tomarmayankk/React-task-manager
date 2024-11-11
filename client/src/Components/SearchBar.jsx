import React from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch }) => {
  return (
    <div className="flex items-center w-96 justify-between rounded-lg px-6 py-2 bg-gray-200">
      <input
        type="text"
        placeholder="Type to search"
        className="w-full px-1 outline-none rounded-lg bg-transparent text-slate-950"
        value={value}
        onChange={onChange}
      />
      <span className="text-xl text-gray-600 hover:text-gray-900 font-bold cursor-pointer" onClick={handleSearch}>
        <IoMdSearch />
      </span>
    </div>
  );
};

export default SearchBar;
