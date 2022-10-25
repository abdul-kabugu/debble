import {FaPlayCircle, FaPauseCircle} from 'react-icons/fa'

const PlayListPlayPause = ({isPlaying, song,  activeSong, i , handlePlay, handlePause, albumId, activeAlbum }) =>{


 return(
  <div>
    {(isPlaying && activeAlbum === albumId) ? (
      <FaPauseCircle size={35} className="text-gray-300 cursor-pointer"
        onClick={ handlePause}
      />
    ): (
      <FaPlayCircle size={35} className="text-gray-300 cursor-pointer"
        onClick={handlePlay}
      />
    ) 
    
    }
  </div>
 )
 }
export default PlayListPlayPause;
