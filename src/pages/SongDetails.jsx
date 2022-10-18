  import {useParams} from 'react-router-dom'
  import {DetailsHeader, RelatedSongs} from '../components'
  import {useSelector, useDispatch} from 'react-redux'
  import {setActiveSong, playPause} from "../redux/features/playerSlice"
  import {useGetSongDetails, useGetSongRevenue, useDiscoverSongs, useGetLatestSongs} from '../hooks/useLens'
  
import PlayPause from '../components/PlayPause'
import TrackBar from '../components/TrackBar'
  
const SongDetails = () => {
     const {songid} = useParams()
     const dispatch = useDispatch()
     const {activeSong, isPlaying} = useSelector((state) => state.player)

         const { latestSongs, isLatestSongsLoading, isLatestSongsError} = useGetLatestSongs()
        const { songs}  = useDiscoverSongs()
      const {songRevenueStats, isSongReveneuStatsLoading, isSongRevenueStatsError} = useGetSongRevenue(songid)

      const {songDetail, isSongDetailsLoading, isSongDetailsError} = useGetSongDetails(songid)
      
       //const {testing} = useTest(songid)

         console.log("testing  info", songs)
         console.log("the song details", songDetail)
     
     const artistId = songDetail?.publication.profile.id
     
     const handlePauseClick = () => {
      dispatch(playPause(false))
     }
      const data = latestSongs
     const handlePlayClick = (song, i) => {
       dispatch(setActiveSong({song, data , i}))
        dispatch(playPause(true))
     }

        
     return(
    <div className='flex flex-col'>
   <DetailsHeader song ={songDetail} />

    <div className='mb-6'>
      <h1 className='text-white text-2xl font-bold mt-3' >Tracks</h1>

      {songDetail?.publication.metadata.media?.map((track, i) => {

          return(
               <TrackBar 
                 key={i}
                 song = {track} 
                 data = {songDetail}
                  isPlaying = {isPlaying}
                  activeSong = {activeSong}
                  i = {i}
                 
               />
          )
      })}
    </div>
      <RelatedSongs  latestSongs = {latestSongs} 
      isLatestSongsLoading = {isLatestSongsLoading}
       isLatestSongsError ={isLatestSongsError}
       isPlaying = {isPlaying}
       activeSong = {activeSong}
       handlePlay = {handlePlayClick}  
       handlePause = {handlePauseClick}
       data = {latestSongs}
       />
    </div>
     )
} 

export default SongDetails;
