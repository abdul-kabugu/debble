import SongBar from "./SongBar";

const RelatedSongs = ({data, handlePause, handlePlay,  activeSong, isPlaying,  isLatestSongsError, isLatestSongsLoading}) => {
   console.log("related songs", data)
  return(
  <div className="flex flex-col">
    <h1 className="font-bold text-white text-2xl">Related Songs</h1>
    <div className="flex flex-col mt-6 w-full">
       {data?.explorePublications.items.map((song, i) => {

        return(
          <SongBar 
            key={i}
            song = {song}
            i = {i}
            isPlaying = {isPlaying}
            activeSong = {activeSong}
            handlePlayClick = {handlePlay}
            handlePauseClick = {handlePause}
          />
        )
       })}
    </div>
  </div>
  )
}

export default RelatedSongs;
