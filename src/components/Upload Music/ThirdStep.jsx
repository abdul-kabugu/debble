import React, {useState} from 'react'
import { AiOutlineClose, AiOutlineRetweet } from 'react-icons/ai'
import { BiWorld } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { BsTags } from 'react-icons/bs'
export default function ThirdStep({
  dropTags,  setdropTags,   mirrorRules,
  setmirrorRules
}) {
  const [tagName, settagName] = useState("")

    // add  new  tag
  const addNewTag = (event) => {
    if(event.key === "Enter" && tagName !== ""  && dropTags.length < 5){
      
      setdropTags([...dropTags, tagName])
      settagName("")
        
      
     
   }
   }

   const  addViBtn =  () => {
       if(dropTags < 5){
        setdropTags([...dropTags, tagName])
      settagName("")
       }
   }

   

   //Remove  tag
   const removeTag = (index) => {
    setdropTags([...dropTags.filter(tags => dropTags.indexOf(tags) !== index)])
   }
    
  return (
    <div className='p-2 flex flex-col justify-center items-center '>
      <div className='w-full md:w-4/5 '>
      <div className='flex items-center mb-4 '>
        <AiOutlineRetweet className='text-2xl text-white mr-2' />
        <h1 className='capitalize text-white text-lg'>Select who can mirror</h1>
      </div>
      <div className='w-full '>
       <div className='w-full h-16 border rounded-lg flex items-center cursor-pointer px-3' onClick={() => setmirrorRules(false)}>
        <div className='flex items-center '>
          <BiWorld className='text-lg text-white mr-2' />
           <p className='text-lg text-white capitalize font-semibold'>everyone can mirror</p>
        </div>
       </div>
      

     
       <div className='w-full h-16 border rounded-lg mt-5 px-3 cursor-pointer flex items-center ' onClick={() => setmirrorRules(true)}>
       <div className=' flex items-center center'>
        <FiUsers className='text-lg text-white mr-2' />
        <p className=' text-lg text-white capitalize font-semibold'>only followers can mirror</p>
       </div>
       </div>
      

      
       <div className=' mt-4 flex items-center '>
          <BsTags  className='text-lg text-white mr-3' />
          <h3 className='text-lg text-white capitalize'>add tags</h3>
       </div>
        
       <div className='w-full h-36 border rounded-lg mt-5 p-4 flex items-center flex-wrap'>
         {dropTags?.map((tag, i) => {

          return(
            <div key={i}>
              <li className=' py-1 px-2 mr-2 rounded-md flex list-none border items-center justify-between text-white'>
                {tag}
                <AiOutlineClose className='ml-1 cursor-pointer' onClick={() => removeTag(i)} />
                </li>
            </div>
          )
         })}
        <input  type="text" placeholder='Enter tag name' className='bg-transparent outline-none text-white ml-3'
          value={tagName}
          onChange={e => settagName(e.target.value)}
          onKeyUp={event => addNewTag(event)}  
        />
       </div>
   
    </div>
    </div>
    </div>
  )
}
