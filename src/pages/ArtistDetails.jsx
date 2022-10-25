import { useGetArtistSongs, useGetArtistProfile, useTest, useFollow } from "../hooks/useLens";
import {useParams} from 'react-router-dom'
 import { FiUsers } from 'react-icons/fi'
import { truncateString } from "../hooks/useSubString";
import { AlbumCard } from "../components";
import {useQuery} from '@apollo/client'
import { TEST_GET_PUB } from "../graphql/query/testgetsongs";


const ArtistDetails = () => {
     
     
   const {id} = useParams()
  const {artistSongs, isGetArtistSongsLoading, isGetArtistSongsError} = useGetArtistSongs(id)
   const {artistProfile, isArtistProfileLoading, isArtistProfileError} = useGetArtistProfile(id)
   const {follow} = useFollow()
    const USER_ID = artistProfile?.profile?.id
   
       if (isGetArtistSongsLoading || isArtistProfileLoading) {
        return(
          <h3 className="text-white">Some Info is loading</h3>
        )
       }

       if(isArtistProfileError || isGetArtistSongsError){
        return(
          <div className='w-full h-screen flex items-center justify-center'>
          <h1 className='text-white font-semibold text-3xl'>Something went wrong please refresh </h1>
       </div>
        )
       }
   return(
  <div className="w-full">
     <div className="artist_bg">
        <div className="w-full flex  flex-col md:flex-row  p-5 items-center justify-center md:items-start md:justify-start lg:items-start lg:justify-start ">
         <div className="rounded-full bg-black  flex items-center justify-center w-[250px] h-[250px] min-w-[250px] min-h-[250px]">
         <img   src={artistProfile?.profile.picture?.original?.url}   alt="profile image"  
           className="w-11/12 rounded-full object-cover"
         />
         </div>
          <div className="ml-3   w-full flex flex-col items-center justify-center md:items-start md:justify-start lg:items-start lg:justify-start ">
            <h1 className="text-3xl text-white font-semibold">{artistProfile?.profile?.name || artistProfile?.profile?.handle}</h1>
              <p className="text-white capitalize mt-3">{artistProfile?.profile?.description || "No  Bio" }</p>
              <div className="mt-4 flex flex-wrap ">
               <div className="flex items-center  bg-black/20 rounded-lg  justify-between py-2 px-4 w-2/5 min-w-[150px] my-1 mx-5 ">  
               {/*} <FiUsers size={24} className="text-white" />*/}
                <p className="text-white font-bold ">Followers</p>
                 <p className="text-lg text-white  font-semibold">{artistProfile?.profile?.stats?.totalFollowers}</p>
               </div>

               <div className="flex items-center  bg-black/20 rounded-lg  justify-between py-2 px-4 w-2/5 min-w-[150px] my-1 mx-5">  
               <p className="text-white font-semibold">Following</p>
                 <p className="text-lg text-white  font-semibold">{artistProfile?.profile?.stats?.totalFollowing}</p>
               </div>

               <div className="flex items-center  bg-black/20 rounded-lg  justify-between py-2 px-4 w-2/5 min-w-[150px] my-1 mx-5">  
                <p className="text-white font-bold">Mirrors</p>
                 <p className="text-lg text-white  font-semibold">{artistProfile?.profile?.stats?.totalMirrors}</p>
               </div>

               <div className="flex items-center  bg-black/20 rounded-lg  justify-between py-2 px-4 w-2/5 min-w-[150px] my-1 mx-5">  
                <p className="text-white font-semibold">Collects </p>
                 <p className="text-lg text-white  font-semibold">{artistProfile?.profile?.stats?.totalCollects}</p>
               </div>
              </div>

              <div className=" w-full flex  items-end justify-end mt-4">
               <button className=" bg-white py-2 px-8 rounded-md" onClick={() => follow(USER_ID)}>Follow </button>
              </div>
          </div>
        </div>
     </div>

      
       <h1 className="text-white text-3xl font-semibold my-3">Albums</h1>
       <div className="flex flex-wrap justify-start md:justify-center gap-4 md:gap-4">
         {artistSongs?.publications?.items?.map((song, i) => {

            return(
              <div>
             
              <AlbumCard 
               song = {song}
               i = {i}
              data = {artistSongs}
              
              />
              </div>
            )
         })}
       </div>
  </div>
   )
}

export default ArtistDetails;
