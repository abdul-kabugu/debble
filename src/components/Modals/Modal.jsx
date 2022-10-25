import React from 'react'

export default function Modal(props) {
  return (
    <div className='w-screen bg-white/80 min-h-screen fixed top-1 flex items-center justify-center z-10 '>
         <div className='border   border-blue-500 h-full animate-slideup   md:h-4/5 bg-black text-white rounded-lg p-3 bg-opacity-100'>{props.children}</div>
    </div>
  )
}
