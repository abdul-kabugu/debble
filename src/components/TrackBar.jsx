import React from 'react'
import {useDispatch} from 'react-redux'
import PlayPause from './PlayPause'
import {setActiveSong, playPause, } from '../redux/features/playerSlice'
import { truncateString } from '../hooks/useSubString'

export default function TrackBar({song, activeSong,  data, i, isPlaying}) {
     const dispatch = useDispatch()
     console.log("current  song", song)
     
     const handlePauseClick = () => {
      dispatch(playPause(false))
     }
     const handlePlayClick = () => {
       dispatch(setActiveSong({song, data, i}))
        dispatch(playPause(true))
     }
  return (
    <div className="flex flex-row w-full items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
        <h3 className="font-bold mr-3 text-white text-base">{i + 1}</h3>
        <div className="flex flex-1 flex-row justify-between  items-center">
        <img  src={song?.original.cover} alt={song?.original.altTag} className="w-10 h-10 rounded-lg"  />
        <div className="flex-1 flex-col flex justifuy-center mx-3">
        <p className="text-lg  text-gray-300 font-bold ">{truncateString(song && song?.original.altTag, 10)}</p>
      {/*}  <div className="flex flex-row">
        <p className="text-ase  text-white font-bold truncate ">{song?.profile.name || song?.profile.handle}</p>

  </div>*/}
        </div>
        <PlayPause 
           isPlaying={isPlaying}
           activeSong = {activeSong}
           song = {song}
            handlePlay = {handlePlayClick}
            handlePause = {handlePauseClick}
          />
        </div>
    </div>
  )
}
