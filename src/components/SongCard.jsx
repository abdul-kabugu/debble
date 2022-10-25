import {Link, } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import {playPause, setActiveSong, } from '../redux/features/playerSlice'

const SongCard = ({song, activeSong, isPlaying, i, data,  playList}) => {

  const dispatch = useDispatch()
  const handlePauseClick = () => {
   dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}))
     dispatch(playPause(true))
  }

   // song.metadata?.image || song?.original?.cover
   // song?.metadata ? song?.metadata?.name || song?.metadata?.content : song?.original?.altTag
  return(
  <div className='flex flex-col w-[200px]  p-4 bg-white/5  backdrop-blur-sm
   animate-slideup rounded-lg cursor-pointer
  '>
  <div className='w-full relative h-40 group'>
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
   <img    alt='song_img' src={song.metadata?.image || song?.original?.cover} className="w-full max-h-[160px] object-cover  rounded-lg" />
  </div>
  <div className='mt-4 flex flex-col'>
   <p className='font-semibold text-lg text-white mt-1 truncate '>
    <Link to={`/songs/${song?.id}`}>{song?.metadata ? song?.metadata?.name || song?.metadata?.content : song?.original?.altTag}</Link>
   </p>
   <p className='font-semibold text-sm text-gray-300 mt-1 truncate'>
    <Link to={`/artists/${song?.profile?.id}`}>{song?.profile?.name || song?.profile?.handle}</Link>
   </p>

   
  </div>
  </div>
)};

export default SongCard;
