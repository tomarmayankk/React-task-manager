import React from 'react'
import { getPfpName } from '../utils/Helper'
import { IoMdLogOut } from "react-icons/io";


const ProfileInfo = ({onLogout}) => {
  return (
    <div className='flex w-38 h-14 top-0 rounded-md gap-5 items-center justify-center mr-1 p-5'>
        <div className='flex rounded-full bg-gray-400 font-semibold text-xl h-12 w-12 items-center justify-center'>
            {getPfpName("Mayank Tomar")}
        </div>
        <div className='flex items-center gap-3 font-semibold'>
            <h2>Mayank Tomar</h2>
            <button onClick={onLogout} className='cursor-pointer text-xl'><IoMdLogOut /></button>
        </div>
    </div>
  )
}
export default ProfileInfo