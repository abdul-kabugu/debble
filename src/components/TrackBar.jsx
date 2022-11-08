import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import PlayPause from './PlayPause'
import {setActiveSong, playPause, } from '../redux/features/playerSlice'
import { truncateString } from '../hooks/useSubString'
import { SiApplemusic } from 'react-icons/si'
import { VscAdd } from 'react-icons/vsc'
import { IoMdAddCircle } from 'react-icons/io'
import { useNewMoralisObject , useMoralis, useMoralisQuery} from 'react-moralis'
import Modal from './Modals/Modal'
import { useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
export default function TrackBar({song, activeSong,  data, i, isPlaying, fullSong}) {
  const [currentSong, setcurrentSong] = useState()
   const [isPlayListModalOpen, setisPlayListModalOpen] = useState(false)
   const [isAddNewPlayList, setisAddNewPlayList] = useState(false)
   const [currentSelectedPlayList, setcurrentSelectedPlayList] = useState()
    const [arrayOfSongs, setarrayOfSongs] = useState([])
   const {user, Moralis} = useMoralis()
    const account = user?.attributes?.ethAddress
  const {isSaving : isCreatingNewPlayList, save : createNewPlayList, error : newPlayListError} = useNewMoralisObject("PlayLists")
   const {data: userPlayList , isLoading : isUserPlayListsLoading, error : isUserPlayListError} = useMoralisQuery("PlayLists", query =>
     query.
      equalTo("CreateBy", account)
   )
  // const {activeSong, isPlaying} = useSelector((state) => state.player)
     const toggleIsPlayListModal = () =>{
         isPlayListModalOpen ? setisPlayListModalOpen(false) : setisPlayListModalOpen(true)
     }

       const handleOpenPlayListModal =  (track) =>  {
          setcurrentSong(track)
         setisPlayListModalOpen(true)
       }
     console.log("ponted track", song)
        
      
     const  handleSelectedPlayList =  async (song) =>  {
           setcurrentSelectedPlayList(song)
            setarrayOfSongs(song?.attributes?.Song)
            console.log("the array  of  songs", arrayOfSongs)
            song.add("Song", currentSong)
            await  song.save()

             console.log(song)
             
          
     }

       const  handleDeleteObject = async (song)  => {
        song.destroy().then(
          (myObject) => {
            // The object was deleted from the Moralis Cloud.
            alert("The object was deleted from the Moralis Cloud.")
          },
          (error) => {
            // The delete failed.
            // error is a Moralis.Error with an error code and message.
            alert("The delete failed.")
          }
        );
       }  
     
     const  addSongToPlayList  =  async (song) =>  {
          setcurrentSelectedPlayList(song)
          setarrayOfSongs(song)
          await song.save()

     }
     //console.log("current selected Plalist", currentSelectedPlayList)


       
     const dispatch = useDispatch()
     console.log("current  user  playLists", userPlayList)
     
     const handlePauseClick = () => {
      dispatch(playPause(false))
     }
     const handlePlayClick = () => {
       dispatch(setActiveSong({song, data, i}))
        dispatch(playPause(true))
     }
  return (
    <>
     {isPlayListModalOpen && <Modal>
      <div className='w-[360px] '>
      <div className='flex items-center justify-between  pb-3'>
      <h2>Add To Playlist</h2>
      <AiOutlineClose     className='cursor-pointer' size={22} onClick={toggleIsPlayListModal}      />
      </div>
      <div className='mt-3'>
        {userPlayList ? 
          userPlayList?.map((playList, i) => {

            return(
              
                <div key={i} className="my-3 flex items-center cursor-pointer" onClick={() => handleSelectedPlayList(playList)}>
                     
                 {/*} <img   src={playList?.attributes?.Song.metadata?.image }   alt="play list profile"  
                     className='w-[50px] object-cover rounded-md'
            />*/}
              <SiApplemusic className='' size={30} />
                  <h3 className='ml-2 capitalize'>{playList?.attributes?.PlayListName}</h3>
                </div>
            
            )
          }) :(
            <h1>Please  create  play list  first  to  add  songs</h1>
          )
      }
      </div>
      </div>
    </Modal>}
    <div className="flex flex-row w-full items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
        <h3 className="font-bold mr-3 text-white text-base">{i + 1}</h3>
        <div className="flex flex-1 flex-row justify-between  items-center">
        <img  src={song?.original?.cover || song?.metadata?.image} alt={song?.original?.altTag} className="w-10 h-10 rounded-lg"  />
        <div className="flex-1 flex-col flex justifuy-center mx-3">
        <p className="text-lg  text-gray-300 font-bold ">{ song?.original?.altTag ? truncateString(song && song?.original?.altTag, 10) :  truncateString(song && fullSong?.publication?.metadata?.name, 10)}</p>
      {/*}  <div className="flex flex-row">
        <p className="text-ase  text-white font-bold truncate ">{song?.profile.name || song?.profile.handle}</p>

  </div>*/}
        </div>
        <div className='flex items-center gap-4'>
          
          <IoMdAddCircle  size={37} className="text-gray-300 cursor-pointer" onClick={() => handleOpenPlayListModal(song)}/>
        <PlayPause 
           isPlaying={isPlaying}
           activeSong = {activeSong}
           song = {song}
            handlePlay = {handlePlayClick}
            handlePause = {handlePauseClick}
          />
        </div>
        </div>
    </div>
    </>
  )
}
