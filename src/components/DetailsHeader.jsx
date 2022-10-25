import {Link } from 'react-router-dom'
import { truncateString } from '../hooks/useSubString';
import { MdOutlineCollections } from 'react-icons/md'
import { IoLogoUsd } from 'react-icons/io'
import { useState } from 'react';
import Modal from './Modals/Modal';
import { AiOutlineClose, AiOutlineFileAdd } from 'react-icons/ai';
import { GiLoveSong } from 'react-icons/gi';
import { useCollect, useMirror } from '../hooks/useLens';


const DetailsHeader = ({song, defaultProfile, firstUserId }) => {
  const [isCollectModal, setisCollectModal] = useState(false)

  const toggleIsCollectModal = () => {
    isCollectModal ? setisCollectModal(false) : setisCollectModal(true)
  }

  const {collect} = useCollect()
  const {mirror} = useMirror()
   const POST_ID = song?.publication?.id
   const USER_ID = defaultProfile?.id || firstUserId?.id
   
    const getCollectModule = () => {
      if(song?.publication?.collectModule.__typename === "FreeCollectModuleSettings" ){
        return (
           <h3>Free Collect</h3>
        )
      }else if(song?.publication?.collectModule.__typename === "FeeCollectModuleSettings"){
        return (
          <h3>Fee Collect</h3>
       )
      }else if(song?.publication?.collectModule.__typename === "LimitedFeeCollectModuleSettings"){
        return (
          <h3>Limited collect</h3>
       )
      }else if(song?.publication?.collectModule.__typename === "LimitedTimedFeeCollectModuleSettings"){
        return (
          <h3>Limited timed collect</h3>
       )
      }else if(song?.publication?.collectModule.__typename === "imedFeeCollectModuleSettings"){
        return (
          <h3>Limited time collect</h3>
       )
      }
    }
  console.log("the song from header component", song)
  return(
  <div className='w-full  bg-gradient-to-l  from-transparent to-black h-full p-3'>
     {isCollectModal  && <Modal>
      <div className='w-[350px]'>
        <div className='flex justify-between'>
          <div className='flex gap-3 items-center'>
            <AiOutlineFileAdd  />
              {getCollectModule()}
          </div>

           <AiOutlineClose size={20} className="cursor-pointer" onClick={toggleIsCollectModal}/>
        </div>

         <div className='mt-4'>
            <div className='flex items-center'>
              <GiLoveSong size={19}/>
               <h3 className='ml-3 font-bold'>Post By </h3>
                <h3 className='ml-1'>{song?.publication?.profile?.handle}</h3>
            </div>
             <p className='mt-4 text-white/40'>{song?.publication && truncateString(song?.publication?.metadata.content, 16)}</p>
             <div className='mt-4 flex items-center justify-end'>
              <button className='border w-[170px] py-1 px-1 rounded-lg' onClick={() => collect(POST_ID, USER_ID)}>Collect</button>
             </div>
         </div>
      </div>
    </Modal>}
    <div className='flex flex-col lg:flex-row items-center justify-center lg:items-start lg:justify-start'>
     <div className=' '>
         <img   src={song?.publication?.metadata?.image} alt="Album cover"
           className='w-[270px] rounded-lg object-cover' 
         /> 
     </div>
     <div className=' w-full ml-5 sm:mt-3'>
      <h1 className='text-white text-4xl font-semibold capitalize'>{song?.publication && truncateString(song?.publication?.metadata?.name, 20)}</h1>
       <div className='my-5'>
        <div className='flex items-center'>
          <img  alt='artis img' src={song?.publication?.profile?.picture?.original.url} 
          className="w-[30px] h-[30px] rounded-full object-cover"
          />
           <h3 className='text-white font-semibold text-xl mx-4'>Artist :</h3>

            <Link to={`/artists/${song?.publication?.profile?.id}`}><p className='text-white'>{song?.publication?.profile?.handle}</p> </Link>
            
        </div>
       </div>

       <div className='my-5'>
        <div className='flex items-center'>
           <MdOutlineCollections size={26}
             className="text-white"
           />
           <h3 className='text-white font-semibold text-lg mx-4'>Collect Module :</h3>

           <p className='text-white'>{song?.publication && truncateString(song?.publication?.collectModule?.__typename, 15)}</p>
            
        </div>

       
       </div>

       <div className='my-5'>
        <div className='flex items-center'>
          <IoLogoUsd  size={26} 
            className="text-white"
          />
           <h3 className='text-white font-semibold text-lg mx-4 capitalize'>total revenue :</h3>

           <p className='text-white'>---</p>
            
        </div>

       
       </div>

        <div className='flex flex-wrap '>
         <div className='bg-white/10 w-[170px] py-3 px-4 rounded-md flex justify-between my-2 mx-2'>
          <h5 className='text-white capitalize font-semibold'>limit </h5>
           <h3 className='text-white font-bold'>200</h3>
         </div>

         <div className='bg-white/10 w-[170px] py-3 px-4 rounded-md flex justify-between my-2 mx-2'>
          <h5 className='text-white capitalize font-semibold'>amount </h5>
           <h3 className='text-white font-bold'>100 </h3>
         </div>

         <div className='bg-white/10 w-[170px] py-3 px-4 rounded-md flex justify-between my-2 mx-2'>
          <h5 className='text-white capitalize font-semibold'>currency </h5>
           <h3 className='text-white font-bold'> WETH </h3>
         </div>

         <div className='bg-white/10 w-[170px] py-3 px-4 rounded-md flex justify-between my-2 mx-2'>
          <h5 className='text-white capitalize font-semibold'>referral </h5>
           <h3 className='text-white font-bold'> 10% </h3>
         </div>

         <div className='bg-white/10 w-[170px] py-3 px-4 rounded-md flex justify-between my-2 mx-2'>
          <h5 className='text-white capitalize font-semibold'>collects </h5>
           <h3 className='text-white font-bold'> {song?.publication?.stats?.totalAmountOfCollects} </h3>
         </div>

         <div className='bg-white/10 w-[170px] py-3 px-4 rounded-md flex justify-between my-2 mx-2'>
          <h5 className='text-white capitalize font-semibold'>mirrors </h5>
           <h3 className='text-white font-bold'> {song?.publication?.stats?.totalAmountOfMirrors} </h3>
         </div>
        </div>

         <div className='flex items-end justify-end mt-4'>
          <button className={`bg-slate-50 py-2 px-8 w-[170px] text-xl mx-4 rounded-lg capitalize`} onClick={toggleIsCollectModal} >{song?.publication?.hasCollectedByMe ? "collected" : "collect"}</button>
          <button className='bg-slate-50 py-2 px-8 w-[170px] text-xl mx-4 rounded-lg capitalize' onClick={() => mirror(POST_ID, USER_ID)}>mirror</button>
         </div>
     </div>
    </div>
    </div>
  )
}

export default DetailsHeader;
