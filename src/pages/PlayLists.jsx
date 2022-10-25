import React from 'react'
import { useState } from 'react'
import { useMoralisQuery, useMoralis,  } from 'react-moralis'
import { useDispatch,  useSelector} from 'react-redux'
import { SongCard } from '../components'
import PlayListCard from '../components/PlayListCard'

 import {playPause, setActiveSong} from '../redux/features/playerSlice'
export default function PlayLists() {
  const [isPublic, setisPublic] = useState(true)
     const {data, isLoading, error} = useMoralisQuery("PlayLists", query => query.equalTo("IsPublic", isPublic))
     const {activeSong, isPlaying, activeAlbumId} = useSelector((state) => state.player )
     console.log("trending  play  lists", activeAlbumId)
     console.log("all playlists  in app",  data)

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
