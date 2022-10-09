import React from 'react'

export default function ModalTwo(props) {
    return (
        <div className='w-full bg-white/80 min-h-screen fixed top-1 flex items-center justify-center'>
             <div className='border w-4/5  md:w-1/3 border-blue-500 h-full  md:h-4/5 bg-black text-white rounded-lg p-3'>{props.children}</div>
        </div>
      )
}
