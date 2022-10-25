  import {useParams} from 'react-router-dom'
  import {DetailsHeader, Modal, RelatedSongs} from '../components'
  import {useSelector, useDispatch} from 'react-redux'
  import {setActiveSong, playPause} from "../redux/features/playerSlice"
  import {useGetSongDetails, useGetSongRevenue, useDiscoverSongs, useGetLatestSongs, useCollect} from '../hooks/useLens' 
import PlayPause from '../components/PlayPause'
import TrackBar from '../components/TrackBar'
import { useQuery } from '@apollo/client'
import { TEST_GET_PUB } from '../graphql/query/testgetsongs'


  
const SongDetails = ({firstUserId, defaultProfile}) => {
 

     const {songid} = useParams()

      const {data: testingData} = useQuery(TEST_GET_PUB)

      
     const dispatch = useDispatch()
     const {activeSong, isPlaying} = useSelector((state) => state.player)

         const { latestSongs, isLatestSongsLoading, isLatestSongsError} = useGetLatestSongs()
        const {songRevenueStats, isSongReveneuStatsLoading, isSongRevenueStatsError} = useGetSongRevenue(songid)
       const {songDetail, isSongDetailsLoading, isSongDetailsError} = useGetSongDetails(songid)
        const {collect} = useCollect()
       const artistId = songDetail?.publication.profile.id
        
     const handlePauseClick = () => {
      dispatch(playPause(false))
     }
      const data = latestSongs
     const handlePlayClick = (song, i) => {
       dispatch(setActiveSong({song, data , i}))
        dispatch(playPause(true))
     }

       if(isLatestSongsLoading || isSongReveneuStatsLoading || isSongDetailsLoading){
        return(
          <h3 className='text-white'>Some info is still loading</h3>
        )
       } 

       if(isLatestSongsError || isSongDetailsError || isSongRevenueStatsError){
        return(
          <div className='w-full h-screen flex items-center justify-center'>
             <h1 className='text-white font-semibold text-3xl'>Something went wrong please refresh </h1>
          </div>
       )}
     return(
    <div className='flex flex-col'>
   <DetailsHeader song ={songDetail} defaultProfile = {defaultProfile} firstUserId = {firstUserId}/>
   
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
