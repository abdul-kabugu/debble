import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {useEffect} from 'react'
import { useMoralis } from 'react-moralis';
import {useGetLatestSongs, useGetUserProfiles, useGetDefaultId} from './hooks/useLens'
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';
import UploadMusic from './pages/UploadMusic';


const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const {isWeb3Enabled, enableWeb3, account} = useMoralis()
  useEffect(() => {
    if(!isWeb3Enabled){
      enableWeb3()
    }
  }, [])

  //GET_LATEST  SONGS 
   const {latestSongs, isLatestSongsError, isLatestSongsLoading} = useGetLatestSongs()

     // USER_PROFILES
     const {userProfiles, isUserProfilesLoading, isUserProfileError} = useGetUserProfiles(account)
      // DEFAULT  USER  PROFILES 
     const {data, loading, error} = useGetDefaultId(account)
    
    
       const FIRST_USER_ID = userProfiles?.profiles?.items[0]
        const DEFAULT_USER_ID = data?.defaultProfile
       
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path='/upload' element = {<UploadMusic  />}      />
              <Route path="/artists/:id" element={<ArtistDetails firstUserId = {FIRST_USER_ID} defaultProfile = {DEFAULT_USER_ID} />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay 
              latestSongs = {latestSongs}
               isLatestSongsLoading = {isLatestSongsLoading}
               isLatestSongsError = {isLatestSongsError}
            />
          </div>
        </div>
      </div>
  
      {(activeSong?.original?.altTag || activeSong?.id) && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
