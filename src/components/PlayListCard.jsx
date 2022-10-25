import {Link, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import PlayPause from './PlayPause';
import {playPause, setActiveSong, } from '../redux/features/playerSlice'
import { useMoralis } from 'react-moralis';
import { truncateString } from '../hooks/useSubString';
import PlayListPlayPause from './PlayListPlayPause';


const PlayListCard = ({song, activeSong, isPlaying, i, data,  playList, songId}) => {
  const dispatch = useDispatch()
   const {activeAlbumId }  = useSelector((state) => state.player)
    const albumID = songId
  const handlePauseClick = () => {
   dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i, albumID}))
     dispatch(playPause(true))
  }
    const {PlayListName, CreateBy    } = playList
    console.log("the plalist  attributes" + " playlist name" + PlayListName + "the current  song", song)
    console.log("the plalist  song id", )

   // song.metadata?.image || song?.original?.cover
   // song?.profile?.name || song?.profile?.handle
   
   // song?.metadata ? song?.metadata?.name || song?.metadata?.content : song?.original?.altTag

     // song?.metadata ? song?.metadata?.name || song?.metadata?.content : song?.original?.altTag
  return(
  <div className='flex flex-col w-[200px]  p-4 bg-white/5  backdrop-blur-sm
   animate-slideup rounded-lg cursor-pointer
  '>
  <div className='w-full relative h-40 group'>
   <div className={`absolute inset-0 justify-center items-center 
    bg-black bg-opacity-50 group-hover:flex rounded-lg 
    ${activeSong?.id === song?.id ? "flex bg-black bg-opacity-70" : "hidden"}
   `}>
     <PlayListPlayPause
       song = {song}
       albumId = {songId}
        activeAlbum = {activeAlbumId}
       isPlaying = {isPlaying}
       activeSong = {activeSong}
       handlePlay = {handlePlayClick}
       handlePause = {handlePauseClick}
     />
   </div>
   <img    alt='song_img' src={song?.metadata?.image || song?.original?.cover} className="w-full max-h-[160px] object-cover  rounded-lg" />
  </div>
  <div className='mt-4 flex flex-col'>
   <p className='font-semibold text-lg text-white capitalize mt-1 truncate  '>
    <Link to={`/playlists/${songId}`}>{PlayListName}</Link>
   </p>
   <p className='font-semibold text-sm text-gray-300 mt-1 truncate'>
    <Link to={`/artists/${song?.profile?.id}`}>{ song && truncateString(CreateBy, 10)}</Link>
   </p>

   
  </div>
  </div>
)};

export default PlayListCard;
