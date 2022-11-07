import React from 'react'
import { useState } from 'react'
import { useMoralisQuery, useMoralis,  } from 'react-moralis'
import { useDispatch,  useSelector} from 'react-redux'
import { SongCard } from '../components'
import PlayListCard from '../components/PlayListCard'
import HashLoader from 'react-spinners/HashLoader'
 import {playPause, setActiveSong} from '../redux/features/playerSlice'
export default function PlayLists() {
  const [isPublic, setisPublic] = useState(true)
     const {data, isLoading, error} = useMoralisQuery("PlayLists", query => query.equalTo("IsPublic", isPublic))
     const {activeSong, isPlaying, activeAlbumId} = useSelector((state) => state.player )
     //console.log("trending  play  lists", activeAlbumId)
    /// console.log("all playlists  in app",  data)

       if(isLoading){
        return(
          <div className='w-full h-screen flex items-center justify-center'>
          <HashLoader color="#36d7b7" />
        </div>
        )
       }

       if(error) {
        return(
          <div className='w-full h-screen flex items-center justify-center'>
              <h3 className='text-xl font-semibold text-white capitalize'>Something  went  wrong  please check  your  connection and try again</h3>
          </div>
        )
       }
  return (
    <div className='flex flex-wrap justify-start md:justify-center gap-4 md:gap-8'>
       {data?.map((playlist, i) =>  {
           const theSong = playlist?.attributes?.Song?.map((song) => song)
             console.log("the song here ", theSong)
         return(
            <PlayListCard
              song=    {theSong[i]  || playlist?.attributes?.Song[0]}                      //{playlist.attributes?.Son}
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
