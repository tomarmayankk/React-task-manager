import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import NoteCard from '../../Components/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from '../../Components/AddEditNotes';
import Modal from "react-modal";

Modal.setAppElement('#root'); // Set this in your main file (like App.js)

const Home = () => {
  const [openAddedit, setOpenAddedit] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <div>
      <Navbar />
      <div className='relative flex flex-col gap-4 w-auto h-[70vh] mt-20 mx-5 mb-5'>
        <div className="m-5 gap-5 flex flex-wrap overflow-y-auto h-full p-4 no-scrollbar">
          <NoteCard title="Meeting" date="3 Apr 2024" content="meeting hai bhai aa jaana important kaam hai aajana bhai zaroor" tags="#meeting" />
        </div>
      </div>
      <button
        onClick={() => setOpenAddedit({ isShown: true, type: 'add', data: null })}
        className='flex items-center justify-center rounded-md bg-blue-500 text-white w-14 h-14 mr-6 mb-4 mt-auto ml-auto'
      >
        <MdAdd className='text-2xl font-bold' />
      </button>

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
type = {openAddedit.type}
noteData={openAddedit.data}
onClose={() => setOpenAddedit({ ...openAddedit, isShown: false })} />
      </Modal>
    </div>
  );
};

export default Home;
