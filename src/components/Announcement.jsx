import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
export default function Announcement({handleToggleAnnouncement}) {
    const openLenster = () => {
        window.open("https://testnet.lenster.xyz/")
    }
  return (
    <div className='w-full h-10 rounded-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-between px-5'>
        <div className='flex gap-4'>
        
        <p className='text-gray-300 font-semibold capitalize text-lg'>create your lens testnet handle here</p>
       <p className='text-lg'>👉 </p> 
       <div className='flex items-center gap-1'>
  <a href='https://testnet.lenster.xyz/' target="_blank" className='text-white'>lenster</a>
   <FiExternalLink className='text-gray-300 cursor-pointer' onClick={openLenster} />
        </div>
        </div>
         <AiOutlineClose size={23} className="text-white cursor-pointer" onClick={handleToggleAnnouncement} />
    </div>
  )
}
