import React from 'react';
import { MdCreate, MdDelete, MdOutlinePushPin, MdDetails } from 'react-icons/md';

const NoteCard = ({ title, date, content, isPinned, onEdit, onDelete, onPinNote, onExtend }) => {
  return (
    <div className="relative p-4 max-w-96 h-44 bg-white rounded-lg shadow-md hover:shadow-2xl hover:bg-slate-100 transition-shadow duration-300">
      {/* Header with Title, Date, and Pin Icon */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h6 className="text-lg font-semibold text-gray-800">{title}</h6>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <MdOutlinePushPin
          onClick={onPinNote}
          className={`cursor-pointer text-xl ${isPinned ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'}`}
        />
      </div>
      {/* Content Preview */}
      <p className="text-gray-700 mb-3">{content?.slice(0, 60)}...</p>

      {/* Tags and Action Icons */}
      <div className="flex justify-between items-center">

        {/* Edit and Delete Icons */}
        <div className="flex space-x-3">
          <MdCreate onClick={onEdit} className="cursor-pointer text-gray-500 hover:text-gray-700 text-lg" />
          <MdDelete onClick={onDelete} className="cursor-pointer text-gray-500 hover:text-gray-700 text-lg" />
          <MdDetails onClick={onExtend} className="cursor-pointer text-gray-500 hover:text-gray-700 text-lg" />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
