import {FaPlayCircle, FaPauseCircle} from 'react-icons/fa'

const PlayPause = ({isPlaying, song,  activeSong, i , handlePlay, handlePause}) =>{


 return(
  <div>
    {isPlaying && activeSong.id === song.id ? (
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
export default PlayPause;
