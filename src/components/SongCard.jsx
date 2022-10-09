import {Link, } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import {playPause, setActiveSong, } from '../redux/features/playerSlice'

const SongCard = ({song, activeSong, isPlaying, i, data}) => {
  //const activeSong = "test"
   console.log("the songs  available right now", data)
  const dispatch = useDispatch()
  const handlePauseClick = () => {
   dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}))
     dispatch(playPause(true))
  }

   console.log("the console from song card", song)
  return(
  <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm
   animate-slideup rounded-lg cursor-pointer
  '>
  <div className='w-full relative h-56 group'>
   <div className={`absolute inset-0 justify-center items-center
    bg-black bg-opacity-50 group-hover:flex
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
   <img    alt='song_img' src={song.metadata.image} className="w-[220px] rounded-sm" />
  </div>
  <div className='mt-4 flex flex-col'>
   <p className='font-semibold text-lg text-white mt-1 truncate '>
    <Link to={`/songs/${song?.id}`}>{song?.metadata.content}</Link>
   </p>
   <p className='font-semibold text-sm text-gray-300 mt-1 truncate'>
    <Link to={`/${song?.profile.handle}`}>{song?.profile.name || song.profile.handle}</Link>
   </p>
  </div>
  </div>
)};

export default SongCard;
