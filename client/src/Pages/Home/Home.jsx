import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import NoteCard from '../../Components/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from '../../Components/AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';

Modal.setAppElement('#root'); // Set this in your main file (like App.js)

const Home = () => {
  const [openAddedit, setOpenAddedit] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState({});
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false)
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddedit({isShown: true, data: noteDetails, type: "edit"})
  }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login")
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }

    } catch (error) {
      console.log("unexpected error")
    }
  }

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
        const response = await axiosInstance.delete("/delete-note/" + noteId)
    if(response.data && !response.data.error){
        getAllNotes();
        alert("Press ok to delete");
    }
    } catch (error) {
  if(error.response && error.response.data && error.response.data.message){
    setError(error.response.data.message);
  }else {
   console.log("an unexpected error occured")
  }
}
  }

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
        const response = await axiosInstance.put("/update-note-pin/" + noteId, {
          "isPinned": !noteData.isPinned
        })
    if(response.data && response.data.note){
        getAllNotes();
    }
    } catch (error) {
      console.log(error)
  }
  }

  const handleExtend = (noteDetails) => {
    setOpenAddedit({isShown: true, data: noteDetails, type: "extend"})
  }

 useEffect(() => {
  getAllNotes();
   getUserInfo();
   return () => {
   }
 }, [])

 return (
  <div>
    <Navbar userInfo={userInfo}/>
    
    {/* Main Notes Section */}
    <div className='relative flex flex-col gap-4 w-auto h-[70vh] mt-20 mx-5 mb-5'>
      <div className="m-5 gap-5 flex flex-wrap overflow-y-auto h-full p-4 no-scrollbar">
        
        {/* Check if there are any notes */}
        {allNotes.length === 0 ? (
          <p className="text-center text-lg text-gray-500 w-full mt-10">No notes available. Start creating!
          </p>
          
        ) : (
          allNotes.map((item, index) => (
            <NoteCard 
              key={item._id} 
              title={item.title} 
              date={moment(item.createdOn).format('MMMM Do YYYY')} 
              content={item.content} 
              isPinned={item.isPinned} 
              onEdit={() => {handleEdit(item)}} 
              onExtend={() => {handleExtend(item)}}
              onDelete={() => {deleteNote(item)}} 
              onPinNote={() => {updateIsPinned(item)}} 
            />
          ))
        )}
      </div>
    </div>
    
    {/* Add Note Button */}
    <button
      onClick={() => setOpenAddedit({ isShown: true, type: 'add', data: null })}
      className='flex items-center justify-center rounded-md bg-blue-500 text-white w-14 h-14 mr-6 mb-4 mt-auto ml-auto'
    >
      <MdAdd className='text-2xl font-bold' />
    </button>

    {/* Modal for Adding or Editing Notes */}
    <Modal
      isOpen={openAddedit.isShown}
      onRequestClose={() => setOpenAddedit({ ...openAddedit, isShown: false })}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }
      }}
      className='w-auto mt-16'
    >
      <AddEditNotes 
        type={openAddedit.type}
        noteData={openAddedit.data}
        onClose={() => setOpenAddedit({ ...openAddedit, isShown: false })}
        getAllNotes={getAllNotes} 
      />
    </Modal>
  </div>
);
};

export default Home;