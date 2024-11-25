import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../utils/axiosInstance';

const AddEditNotes = ({ onClose, type, noteData, getAllNotes }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [error, setError] = useState("");

    //EditNote
    const editNote = async () => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content
            })
        if(response.data && response.data.note){
            getAllNotes();
            onClose();
        }
        } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else {
        setError("an unexpected error occured")
      }
    }
    };

    //AddNewNote
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content
            })
        if(response.data && response.data.note){
            getAllNotes();
            onClose();
        }
        } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else {
        setError("an unexpected error occured")
      }
    }
    };

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter a title.");
            return;
        }
        if (!content) {
            setError("Please enter content.");
            return;
        }

        // Proceed with saving the note
        setError(""); // Clear any existing error
        // Your save logic here...

        if(type === 'edit'){
            editNote();
        }else {
            addNewNote();
        }
        // Close the modal after saving (optional)
        onClose();
    };

    return (
        <div className="relative p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
            {/* Close Button */}
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
                <MdClose className="text-2xl" />
            </button>

            {/* Error Message */}
            {error && (
                <div className="mb-4 text-red-500 text-sm">
                    {error}
                </div>
            )}

            {/* Title Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Meeting"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            {/* Content Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="content">Content</label>
                <textarea
                    id="content"
                    placeholder="Content"
                    rows="10"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                ></textarea>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
            <button
    type="button"
    onClick={type !== "extend" ? handleAddNote : undefined} // Disable click when type is "extend"
    className={`px-4 py-2 font-semibold rounded-md focus:outline-none ${
        type === "extend"
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
    disabled={type === "extend"} // Disable button to prevent interactions
>
    {type === "extend" ? null : type === "edit" ? "UPDATE" : "Save Note"}
</button>
            </div>
        </div>
    );
};

export default AddEditNotes;
