import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {useState} from 'react'
import { useMoralis } from 'react-moralis';
import {useGetLatestSongs, useGetUserProfiles, useGetDefaultId} from './hooks/useLens'
import { Searchbar, Sidebar, MusicPlayer, TopPlay, Announcement } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts, Settings, PlayListsDetails } from './pages';
import UploadMusic from './pages/UploadMusic';
import PlayLists from './pages/PlayLists';
import UserPlayLists from './pages/UserPlayLists';
import  Helmet from  'react-helmet'

const App = () => {
  const [isShowAnnouncement, setisShowAnnouncement] = useState(true)
  const { activeSong } = useSelector((state) => state.player);
  const {isWeb3Enabled, enableWeb3, account, user, isAuthenticated} = useMoralis()
  /*useEffect(() => {
    if(!isWeb3Enabled){
      enableWeb3()
    }
  }, [])*/

  //GET_LATEST  SONGS 
   const {latestSongs, isLatestSongsError, isLatestSongsLoading} = useGetLatestSongs()

     // USER_PROFILES
     const {userProfiles, isUserProfilesLoading, isUserProfileError} = useGetUserProfiles()
      // DEFAULT  USER  PROFILES 
      ///console.log("the user", user?.attributes?.ethAddress)
       const {data, loading, error} = useGetDefaultId()
    
       
       const FIRST_USER_ID = userProfiles?.profiles?.items[0]
        const DEFAULT_USER_ID = data?.defaultProfile

          //console.log("the first user id", FIRST_USER_ID?.id)
         // console.log("the current user account", account)

           const handleToggleAnnouncement = () => {
            isShowAnnouncement ? setisShowAnnouncement(false) : setisShowAnnouncement(true)
           }
       
  return (
    <>
     <main>
      <Helmet>
      <title>Audax | Web3 Music Platform</title>
<meta name="description" content="Audax is Decentralized music streaming  platform where you can  discover and invest to your favorite creators" />
{/*<!-- Google / Search Engine Tags -->*/}
<meta itemprop="name" content="Audax | Web3 Music Platform" />
<meta itemprop="description" content="Audax is Decentralized music streaming  platform where you can  discover and invest to your favorite creators" />
<meta itemprop="image" content="https://i.ibb.co/XtY7JDt/logo-2.png" />
      </Helmet>
     </main>
    <div className="relative flex">
      <Sidebar firstUserId = {FIRST_USER_ID} defaultProfile = {DEFAULT_USER_ID}  />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286] h-min ">
        <Searchbar   />
        {isShowAnnouncement && <Announcement handleToggleAnnouncement = {handleToggleAnnouncement} />}
        <div className="px-6 h-[calc(100vh-1px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/myplalists" element={<UserPlayLists />} />
              <Route path="/podcasts" element={<AroundYou />} />
               <Route path='/playlists'  element={<PlayLists />}           />
              <Route path='/upload' element = {<UploadMusic  />}      />
              <Route path='/settings' element = {<Settings latestSongs ={latestSongs} isLatestSongsLoading ={isLatestSongsLoading}isLatestSongsError ={isLatestSongsError}  />}      />
              <Route path="/artists/:id" element={<ArtistDetails firstUserId = {FIRST_USER_ID} defaultProfile = {DEFAULT_USER_ID} />} />
              <Route  path='/playlists/:playListId'     element={<PlayListsDetails />}            />
              <Route path="/songs/:songid" element={<SongDetails firstUserId = {FIRST_USER_ID} defaultProfile = {DEFAULT_USER_ID}  />} />
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
    </>
  );
 
};

export default App;
