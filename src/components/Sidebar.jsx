import {NavLink} from 'react-router-dom'
//import {logo} from '../assets'
import {links} from '../assets/constants'
import {RiCloseLine} from 'react-icons/ri'
import { useState } from 'react'
import {BiMusic} from 'react-icons/bi'
import {HiOutlineMenu} from 'react-icons/hi'
import Authenticate from './Authenticate'
import {VscAdd} from 'react-icons/vsc'
import Modal from './Modals/Modal'
import { AiOutlineClose } from 'react-icons/ai'
import { useNewMoralisObject, useMoralis } from 'react-moralis'
import {useSelector} from 'react-redux'
const Sidebar = ({firstUserId, defaultProfile }) => {
const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false)
const [isCreatePlaylistModal, setisCreatePlaylistModal] = useState(false)
const [playListName, setplayListName] = useState("")
const [isPublic, setisPublic] = useState(true)
 const [theTargetedSong, settheTargetedSong] = useState([])
const toggleIsCreatePlaylistModal = () => {
  isCreatePlaylistModal ? setisCreatePlaylistModal(false) : setisCreatePlaylistModal(true)
   settheTargetedSong([activeSong])
}

  console.log("the  targeted song", theTargetedSong)
  const {activeSong, isPlaying} = useSelector((state) => state.player)
 const {isSaving : isCreatingNewPlayList, save : createNewPlayList, error : newPlayListError} = useNewMoralisObject("PlayLists")
  const {account} = useMoralis()
   console.log("active song from side bar", firstUserId)
   console.log("isPlaying from side bar", isPlaying)
   console.log("the playlist error", newPlayListError?.message)
     const playListData = {
        "CreateBy" : account,
         "PlayListName" : playListName,
          "IsPublic" : isPublic,
           "Song" : theTargetedSong
     }

const NavLinks = ({handleClick}) => (
  <div className='mt-10'>
    {links.map((link, i) => {

      return(
        <NavLink key={i} className="text-sm my-8 flex flex-row justify-start items-center font-medium text-gray-400 hover:text-cyan-400"
          to={link.to}
          onClick={() => handleClick && handleClick()}
        >
          <link.icon   className='w-6 h-6 mr-2' />
          {link.name}
        </NavLink>

         
      )
    })}
   {isPlaying ? (
     <div className="text-sm my-8 flex flex-row justify-start items-center font-medium text-gray-400 hover:text-cyan-400 cursor-pointer"  onClick={toggleIsCreatePlaylistModal}>
     <VscAdd className='text-white w-5 h-6 mr-2' />
     <p className=' capitalize'>create playlist</p>
    </div>
   ) :
   <div className="text-sm my-8 flex flex-row justify-start items-center font-medium text-gray-400 hover:text-cyan-400 cursor-pointer"  >
   <VscAdd className='text-white w-5 h-6 mr-2' />
   <p className=' capitalize'>create playlist</p>
  </div>
   }
  </div>
)
  return (
 <>
  {isCreatePlaylistModal && <Modal>
   <div className='w-[360px]'>
     <div className='flex items-center justify-between  pb-3'>
      <h2>Add New Playlist</h2>
       <AiOutlineClose className='cursor-pointer' size={22} onClick={toggleIsCreatePlaylistModal}/>
     </div>
     <div className='mt-3'>
    <input   value={playListName} placeholder="Enter title"   onChange={e => setplayListName(e.target.value)} 
    className="w-full border bg-transparent py-2 px-4"                 />
     </div>

      <div className='flex justify-between my-3' >
        
         <div className='flex items-center  gap-2'>
        <input  type="radio" value={isPublic}  checked={isPublic}  onChange={e => setisPublic(true)}   className="cursor-pointer"             />
           <h3> Set as Public </h3>
          </div>

          <div className='flex items-center  gap-2'>
        <input  type="radio" value={isPublic}  checked={!isPublic}  onChange={e => setisPublic(false)}  className="cursor-pointer "              />
           <h3 className='font-semibold '> Set as Private </h3>
          </div>
       
         
      </div>
      <div className='flex items-center justify-center mt-8'>
        
        <button className='w-[180px] py-2 bg-white text-black rounded-md' onClick={() => createNewPlayList(playListData)}>Done</button>
          {isCreatingNewPlayList && <h3>new playlist is loading</h3>}
          
      </div>
      
  </div> 
  </Modal>}
 <div className='hidden md:flex flex-col w-[240px] py-10 px-4
  bg-black 
 '>
  <BiMusic  className='text-white w-full' size={50}/>
  <NavLinks  />

  <div className='mt-4'>
    <Authenticate  firstUserId = {firstUserId} defaultProfile = {defaultProfile} />
     
   </div>
 </div>
 <div className='absolute md:hidden top-6 right-3 '>
   {isMobileMenuOpen ? (
    <RiCloseLine  className='w-6 h-6 text-white mr-2 cursor-pointer' onClick={() => setisMobileMenuOpen(false)}/>
   ) : (
    <HiOutlineMenu  className='w-6 h-6 text-white mr-2 cursor-pointer' onClick={() => setisMobileMenuOpen(true)}/>
   )}
 </div>

 <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b]
   backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${isMobileMenuOpen ? "left-0 " : "-left-full"}
 `}>
  <BiMusic  className='text-white w-full' size={50}/>
  <NavLinks  handleClick={() => setisMobileMenuOpen(true)} />


  <div className='mt-1'>
  <Authenticate   firstUserId = {firstUserId} defaultProfile = {defaultProfile}  />
   </div>
 </div>

   
 </>
  )
}

export default Sidebar;
