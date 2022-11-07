import React, {useState} from 'react'
import {useMoralis} from 'react-moralis'
import useSignIn from '../hooks/useSignIn'
import { AiOutlineClose, AiOutlineLogin, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai'
import {Link} from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import Modal from './Modals/Modal'
import { BsPatchCheck } from 'react-icons/bs'
import { useGetDispatcher, useEnableDispatch } from '../hooks/useLens'

 

export default function Authenticate({ firstUserId , defaultProfile }) {
     const {account, authenticate, isAuthenticated, isAuthenticating, Moralis, logout} = useMoralis()
      const {signIn} = useSignIn()
        const logIn = async () => {
              await Moralis.enableWeb3()
               await signIn()
        }
      const [isExpandProfile, setIsExpandProfile] = useState(false)
      const [isConnectWalletModal, setisConnectWalletModal] = useState(false)
      const [isLensConnectModal, setisLensConnectModal] = useState(false)
      const USER_ID = defaultProfile?.id || firstUserId?.id
        const {dispatcher, isDispatcherError, isDispatcherLoading} = useGetDispatcher(USER_ID)
         const {enableDispatch} = useEnableDispatch()
       
          // console.log("the user profile", firstUserId)
      const toggleShowExpandedProfile = () => {
        isExpandProfile ? setIsExpandProfile(false) : setIsExpandProfile(true)
    }

     const toggleIsConnectWalletModal = () => {
      isConnectWalletModal ? setisConnectWalletModal(false) : setisConnectWalletModal(true)
     }

      const toggleIsLensConnectModal = () => {
        isLensConnectModal? setisLensConnectModal(false) : setisLensConnectModal(true)
      }
    const ConnectWallet = () => (
        <div onClick={toggleIsConnectWalletModal}>
           <button className='bg-white w-[180px] py-2 capitalize rounded-lg'>connect wallet</button>
        </div>
    )

     const LensConnect = () => {
        return(
            <div onClick={toggleIsLensConnectModal}>
                <div className='flex items-center bg-white my-1 w-[180px] py-2 rounded-lg px-3'>
                    <img   alt='lens-logo' src='/img/lens-logo.jpg'  
                      className='w-[30px] h-[30px] rounded-full object-cover  '
                    
                    />
                     <button className=' w-[150px] py-1 capitalize'>Sign In</button>
                </div>
            </div>
        )
     }
       
    
        const  BasicUserProfile = () => {
            return(
                <div className='my-1'>
                 <div className='flex items-center cursor-pointer bg-gray-200 p-2 rounded-md w-[200px]' onClick={toggleShowExpandedProfile}>
                    <img  alt='artist profile' src={defaultProfile? defaultProfile?.picture?.original.url :
                      firstUserId?.picture?.original.url
                    }     className="w-[40px] h-[40px] rounded-full object-cover" />

                      <h3 className=' font-semibold ml-3'>{defaultProfile ? defaultProfile?.handle : firstUserId?.handle}</h3>
                 </div>
                </div>
            )
        }
      const UserProfile = () => {
        return(
            <div className='max-w-[200px]   flex-col p-2 animate-slideup absolute z-10  h-[100px] overflow-y-scroll hide-scrollbar '>
                <div className='flex items-center py-2 '>
                   <AiOutlineUser  size={26} className="text-white"/>
                   <Link to={`/artists/${defaultProfile ? defaultProfile?.id : firstUserId?.id}`}><h3 className='text-white font-semibold ml-6'>Your Profile</h3>  </Link>
                   </div>
                   <div className='flex items-center  py-2 '>
                   <AiOutlineSetting  size={23} className="text-white"/>
                   <Link to={`/settings`}><h3 className='text-white font-semibold ml-6'>Settings</h3>  </Link>
                    </div>
                    <div className='flex items-center  py-2  cursor-pointer '> 
                   <FaSignOutAlt   size={20} className="text-white"/>
                   <h3 className='text-white font-semibold ml-6' onClick={logout}>Log out</h3> 
                    </div> 
                </div>
        
        )
      }   

      const LENS_ACCESS_TOKEN = sessionStorage.getItem("accessToken")

        

       const getCurrentAuthState = () => {
         if(!isAuthenticated ){
           return(
            <ConnectWallet  />
           )
         }else if(isAuthenticated   && LENS_ACCESS_TOKEN == null){
           return(
            <LensConnect  />
           )
         }else if(isAuthenticated  && LENS_ACCESS_TOKEN !== null){
           return(
            <BasicUserProfile  />
           )
         }
       }

  return (
    <div className='overflow-y-scroll hide-scrollbar'>
     {getCurrentAuthState()}
      
    
    {isConnectWalletModal && <Modal>
        <div className='lg:min-w-[400px]'>
            <div className='flex flex-col items-center justify-center'>
                <BsPatchCheck  size={35}  />
                 <h3 className='text-white text-2xl font-semibold '>Connect your wallet</h3>
            </div>

             <div className='my-3 flex justify-between sm:flex-col sm:items-center sm:justify-center lg:flex-row ' onClick={() => authenticate()}>
                <div className='flex flex-col w-[120px]  lg:w-[90px] items-center justify-center cursor-pointer sm:my-3'>
                    <img    src='/img/metamask.svg' alt='metamask logo'  className='w-[100px] lg:max-w-[50px] md:max-w-[30px]' />
                     <h5 className='text-white font-semibold capitalize text-center  text-white/70 md:text-sm'>metamask</h5>
                </div>
             

             
                <div className='flex flex-col w-[120px]  lg:w-[90px] items-center justify-center cursor-pointer sm:my-3' onClick={() => authenticate({ provider: "walletconnect" })}>
                    <img    src='/img/walletconnect.svg' alt='wallet connect logo'  className='w-[110px] md:max-w-[40px] lg:max-w-[30px]' />
                     <h5 className='text-white font-semibold capitalize text-center md:mt-3 sm:mt-2  lg:mt-3 text-white/70 md:text-xs lg:text-xs'>wallet connect</h5>
                </div>
             

             
                <div className='flex flex-col w-[120px] rounded-md lg:w-[90px]  items-center justify-center cursor-pointer sm:my-3'>
                    <img    src='/img/coinbase.svg' alt='metamask logo'  className='w-[100px] lg:max-w-[80px]' />
                     <h5 className='text-white font-semibold capitalize text-center md:mt-3 text-white/70 sm:mt-2 lg:mt-2 md:text-xs
                  lg:text-xs'>coin base</h5>
                </div>

                
             </div>
             <div className='my-5 flex flex-col items-center justify-center'>
                <div className='flex items-center justify-center bg-blue-600 w-11/12 mx-auto py-3 rounded-lg my-4'>
                  <img  src='/img/unstoppable.svg' alt='unstoppable logo' />
                   <button className='font-semibold mx-5'>Log in with Unstoppable</button>
                </div>
                 <button className='w-[130px] border py-2 px-3 rounded-lg ' onClick={toggleIsConnectWalletModal}>cancel</button>
                 </div>
        </div>
  </Modal>}

   {isLensConnectModal && <Modal>
    
        <div className='w-[350px]'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-5'>
            <AiOutlineLogin size={23} />
             <h3 className='font-semibold'>Login</h3>
             </div>

              <AiOutlineClose  size={22} className="cursor-pointer" onClick={toggleIsLensConnectModal}/>
          </div>

            <div className='mt-5'>
              <h1 className='text-white text-xl font-semibold'>Sign-In with Lens</h1>
                <p className='my-2 text-white/30'>Sign  message  to  verify address ownership</p>
            </div>

            <div className='flex items-center justify-end'>
               <button className='bg-white text-black capitalize py-2 w-[150px] px-6 rounded-lg ' onClick={logIn}>sign-in</button>
            </div>
        </div>
    
  </Modal>}
 {isExpandProfile  && <UserProfile  />}
      
    </div>
  )
}
