import React from 'react'
import { AiOutlineDashboard, AiOutlineDatabase } from 'react-icons/ai'
import {useMoralisQuery, useMoralis} from 'react-moralis'
import { useDispatch,  useSelector} from 'react-redux'
import PlayListCard from '../components/PlayListCard'

export default function UserPlayLists() {
  const {activeSong, isPlaying} = useSelector((state) => state.player )
   const {account, isAuthenticated} = useMoralis()
   const {data, isLoading, error} = useMoralisQuery("PlayLists", query =>
    query.equalTo("CreateBy", account)
   )
    console.log("the  user playlists array", data)

      if(!isAuthenticated || !account) {
        return(
          <div className='w-full h-screen items-center justify-center'>
             <h1>Please  Connect  Your  wallet  to  see your  play  lists</h1>
          </div>
        )
      }

       if(data?.length  < 1){
        return(
          <div className='w-full h-screen flex flex-col items-center justify-center '>
            <AiOutlineDatabase    size={150} className="text-white"  />
            <h2 className='text-white text-3xl font-semibold capitalize'>Your  PlayList  is empty</h2>
          </div>
        )
       }

       if(isLoading){
        return(
          <div>
            <h2>data is loading</h2>
          </div>
        )
       }

       if(error) {
        return(
          <h3>{error.message}</h3>
        )
       }
  return (
    <div className='flex flex-wrap justify-start md:justify-center gap-4 md:gap-8'>
      
      
        
    {data?.map((playlist, i) =>  {
        const theSong = playlist?.attributes?.Song?.map((song) => song)
          console.log("the song here ", theSong)
      return(
         <PlayListCard
           song =     {theSong[i]   || playlist?.attributes?.Song[0]}                                      //{playlist.attributes}
            i={i}
            activeSong = {activeSong}
            isPlaying = {isPlaying}
            data = {data}
             songId = {playlist?.id}
             playList = {playlist.attributes }
         />
      )
})} 
 </div>
  )
}
