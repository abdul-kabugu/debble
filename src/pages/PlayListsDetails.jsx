import React from 'react'
import {useParams} from 'react-router-dom'
import { useMoralisQuery, useMoralis} from 'react-moralis'
import { TrackBar } from '../components';
import {useSelector,} from 'react-redux'
import { FaUserAlt } from 'react-icons/fa';
import { truncateString } from '../hooks/useSubString';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsShare } from 'react-icons/bs';
import { MdAudiotrack } from 'react-icons/md';
//import {} from '../redux/features/playerSlice'
export default function PlayListsDetails() {
  const {activeSong, isPlaying} = useSelector((state) => state.player)
  const {playListId}  =  useParams()
  const { data, error, isLoading } = useMoralisQuery("PlayLists", query => 
    query.equalTo("objectId", playListId)
  );
   
    console.log("my active  song", activeSong)

     if(error){
      return(
        <h1>something  went  wrong</h1>
      )
     }
  return (
    <div>
       <div className='w-full h-4/5 p-3 md:h-56  bg-gradient-to-r from-indigo-500 to-purple-400 '>
        {data?.map((list, i) => {
          console.log("the  mapped  data", list)
          return(
            <div className='flex flex-col md:flex-row gap-5'>
               <div className='flex items-center justify-center md:items-start md:justify-start'>
                <img  src={list?.attributes?.Song[0]?.metadata?.image  || list?.attributes?.Song[0]?.original?.cover }  
                  className="w-[200px] rounded-md"
                />
               </div>
                 <div className='flex flex-col items-center justify-center md:justify-start md:items-start'>
             <h1 className='text-3xl capitalize font-bold text-white'>{list?.attributes?.PlayListName}</h1>
                 <div className='mt-4 '>
                  <div className='flex items-center gap-3 my-3'>
                    <FaUserAlt className='text-gray-300' size={23} />
                     <h3 className='text-gray-200'>{list?.attributes && truncateString(list?.attributes?.CreateBy, 15)}</h3>
                  </div>
                  <div className='flex justify-between flex-wrap gap-3 w-[80vw] md:w-full'>
                    <div className='flex items-center gap-3 bg-white/30 rounded-md py-2 px-4 w-[130px] cursor-pointer'>
                    <AiOutlineHeart size={26} className="text-white" />
                     <p className='text-lg text-white'>120</p>
                    </div>

                    <div className='flex items-center gap-3 bg-white/30 rounded-md py-2 px-4 w-[130px] cursor-pointer'>
                    <BsShare size={24} className="text-white" />
                     <p className='text-lg text-white'>20</p>
                    </div>

                    <div className='flex items-center gap-3 bg-white/30 rounded-md py-2 px-4 w-[130px] cursor-pointer'>
                    <MdAudiotrack size={24} className="text-white" />
                     <p className='text-lg text-white'>{list?.attributes?.Song?.length}</p>
                    </div>
                  </div>
               </div>
             </div>
             </div>
          )
        })}
       </div>
         <h1 className='text-3xl text-white font-semibold my-3'>Tracks</h1>
            {data?.map((track, i) => {
               
               return(
                <div>
                
                {track?.attributes?.Song.map((song, i) => {
                  return(
                    <TrackBar
                     song={song}
                     activeSong={activeSong}
                     isPlaying = {isPlaying}
                      i={i}
                      data = {data}
                    />
                  )
                })}
                 </div> 
               )
            })}
    </div>
  )
}
