import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => {
    const getSongName = () => {
      if(activeSong?.metadata?.name){
        return(
          <p className="truncate text-white font-bold text-lg">
            {activeSong?.metadata?.name}
          </p>
        )
      } else if(activeSong?.original?.altTag){
        return(
          <p className="truncate text-white font-bold text-lg">
            {activeSong?.original?.altTag}
          </p>
        )
      }else{
        return(
          <p className="truncate text-white font-bold text-lg">
            No active Song
          </p>
        )
      }
    }
    return(
  <div className="hidden md:flex-1 md:flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={activeSong?.metadata?.image || activeSong?.original?.cover } alt="cover art" className="rounded-full max-w-16 max-h-16 object-cover w-16 h-16 " />
    </div>
    <div className="w-[50%]">
      {getSongName()}
      <p className="truncate text-gray-300">
        {activeSong?.metadata?.name ? activeSong?.profile?.name || activeSong?.profile?.handle || activeSong?.original?.altTag : 'No active Song'}
      </p>
    </div>
  </div>
)}

export default Track;
