import {Error, SongCard, Loader} from '../components'
import {genres} from '../assets/constants'
import {useDiscoverSongs} from '../hooks/useLens'
import {useSelector, useDispatch}  from 'react-redux'
import HashLoader from 'react-spinners/HashLoader'
const Discover = () => {
    const dispatch = useDispatch()
    const {activeSong, isPlaying} = useSelector((state) => state.player )
    const {songs, isSongsError, isSongsLoading} = useDiscoverSongs()
     // console.log("the  discover  gallery", songs)
     
     if(isSongsLoading ){
        return (
          <div className='w-full h-screen flex items-center justify-center'>
              <HashLoader color="#36d7b7" />
            </div>

        )
     }

     if(isSongsError){
      return(
        <div className='w-full h-screen flex items-center justify-center'>
            <h3 className='text-xl font-semibold text-white capitalize'>Something  went  wrong  please check  your  connection and try again</h3>
        </div>
       ) 
     }
return(
<div className='flex flex-col'>
    <div className='flex justify-between w-full items-center sm:flex-row flex-col
      mt-4 mb-10
    '>
        <h2 className='text-3xl text-left text-white'>Discover</h2>
         <select className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'>
           {genres.map((tag,i) => {
            
            return(
                <option key={i} value={tag.value}>{tag.title}</option>
            )
           })}
         </select>
    </div>

    <div className='flex flex-wrap justify-start md:justify-center gap-4 md:gap-8'>
        {songs?.explorePublications?.items.map((song, i ) => {

          return(
            <SongCard  
              key={song?.id}
              song={song}
              data = {songs}
              isPlaying = {isPlaying}
              activeSong = {activeSong}
              i= {i}
            />
          )
        })}
    </div>
</div>
)
}
export default Discover;
