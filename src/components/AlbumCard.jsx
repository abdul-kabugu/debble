import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {playPause, setActiveSong, } from '../redux/features/playerSlice'
import PlayPause from './PlayPause'
import {Link} from 'react-router-dom'

export default function AlbumCard({song, i, data}) {
  const dispatch = useDispatch()
   console.log("the srtist song ", song)
  const handlePauseClick = () => {
    dispatch(playPause(false))
   }
   const handlePlayClick = () => {
     dispatch(setActiveSong({song, data, i}))
      dispatch(playPause(true))
   }

  const {activeSong, isPlaying} = useSelector((state) => state.player)
  return (
    <div className='flex flex-col w-[150px] p-4 bg-white/5 bg-opacity-80
     backdrop-blur-sm animate-slideup rounded-lg cursor-pointer 
    '>
       <div className='w-full relative h-28 group items-center justify-center'>
       <div className={`absolute inset-0 justify-center items-center
    bg-black bg-opacity-50 group-hover:flex rounded-lg
    ${activeSong?.id === song.id ? "flex bg-black bg-opacity-70" : "hidden"}
   `}>

<PlayPause  
       song = {song}
       isPlaying = {isPlaying}
       activeSong = {activeSong}
       handlePlay = {handlePlayClick}
       handlePause = {handlePauseClick}
     />
  </div>
  <img    alt='song_img' src={song.metadata.image} className=" object-cover w-full max-h-[110px]  rounded-lg" />
        </div> 
        <div>
        <p className='font-semibold text-lg text-white mt-1 truncate '>
    <Link to={`/songs/${song?.id}`}>{song?.metadata.content}</Link>
   </p>

   
          </div> 
    </div>
  )
}
