import React, {useState} from 'react'
import FirstStep from '../components/Upload Music/FirstStep'
import SecondStep from '../components/Upload Music/SecondStep'
import ThirdStep from '../components/Upload Music/ThirdStep'
import {useMoralis, useMoralisFile} from 'react-moralis'
import useSongUploader from '../hooks/useSongUploader'
import useSignIn from '../hooks/useSignIn'
import { useGetDefaultId } from '../hooks/useLens/useGetDefaultProfile'
import { useGetUserProfiles } from '../hooks/useLens/useGetUserProfiles'
export default function UploadMusic() {
  const [currentStep, setcurrentStep] = useState(0)
  const [albumName, setalbumName] = useState("")
  const [trackName, settrackName] = useState("")
  const [description, setdescription] = useState("")
  const [albumCover, setalbumCover] = useState([])
  const [audioFile, setaudioFile] = useState([])
  const [colectModule, setcolectModule] = useState("FreeCollectModule")
  const [isCollectFee, setisCollectFee] = useState(false)
  const [isLimiteCollectFee, setisLimiteCollectFee] = useState(false)
  const [selectedCurrency, setselectedCurrency] = useState("")
  const [dropPrice, setdropPrice] = useState("")
  const [refferlFee, setrefferalFee] = useState("")
  const [collectRules, setcollectRules] = useState(false)
  const [dropsSupply, setdropsSupply] = useState("")
  const [dropTags, setdropTags] = useState(["hellow"])
  const [mirrorRules, setmirrorRules] = useState(false)
  const [selectedAlbumCoverUri, setselectedAlbumCoverUri] = useState("")
  const [selectedAudioUri, setselectedAudioUri] = useState("")
  const [AlbumArray, setAlbumArray] = useState([])
  const [isLensConnected, setisLensConnected] = useState(false)
  

  const {authenticate, account, isAuthenticated, user} = useMoralis()
  const {signIn} = useSignIn()
  const {uploadSong} = useSongUploader()
  const parsedReferral = parseFloat(refferlFee)
  
   
   const nextStep = () => {
    if(currentStep < 2){
      setcurrentStep(currentStep + 1)
    }
   }

   const prevStep = () => {
     if(currentStep > 0){
      setcurrentStep(currentStep -1)
     }
   }

   //FUNCTIONS  FROM  CHILD   SECOND  STEP
  const handleCollectModule = (toggler, module) => {
    setcolectModule(module)
    toggler()
  }

  const  toggleIsLimitedFeeToCollect = () => {
    isLimiteCollectFee ? setisLimiteCollectFee(false) : setisLimiteCollectFee(true)
 }

 const  toggleIsFeeToCollect = () => {
  isCollectFee ?  setisCollectFee(false) : setisCollectFee(true)
}

  //FUNCTIONS  FROM  CHILD   SECOND  STEP

  const getCurrentStep = () => {

    if(currentStep === 0){
      return(
        <FirstStep albumName = {albumName} trackName = {trackName} albumCover = {albumCover} 
          audioFile = {audioFile}  setalbumName = {setalbumName} settrackName = {settrackName}
          setalbumCover = {setalbumCover} setaudioFile = {setaudioFile} description = {description}
          setdescription = {setdescription} selectedAlbumCoverUri = {selectedAlbumCoverUri}
           setselectedAlbumCoverUri = {setselectedAlbumCoverUri} selectedAudioUri = {selectedAudioUri}
           setselectedAudioUri = {setselectedAudioUri} AlbumArray = {AlbumArray} setAlbumArray = {setAlbumArray}
        />
      )
    }else if(currentStep  === 1){
      return(
        <SecondStep dropPrice ={dropPrice} setdropPrice ={setdropPrice}
        colectModule = {colectModule} 
          setcolectModule = {setcolectModule} selectedCurrency = {selectedCurrency}
          setselectedCurrency = {setselectedCurrency} isCollectFee = {isCollectFee}
          setisCollectFee = {setisCollectFee} isLimiteCollectFee = {isLimiteCollectFee}
           refferlFee = {refferlFee} setrefferalFee ={setrefferalFee} collectRules = {collectRules}
           setcollectRules = {setcollectRules} setisLimiteCollectFee = {setisLimiteCollectFee}
           dropsSupply = {dropsSupply}  setdropsSupply = {setdropsSupply} handleCollectModule = {handleCollectModule}
           toggleIsLimitedFeeToCollect = {toggleIsLimitedFeeToCollect}
           toggleIsFeeToCollect = {toggleIsFeeToCollect}
        />
      )
    }else if(currentStep === 2){
      return(
        <ThirdStep dropTags = {dropTags}  setdropTags = {setdropTags} 
           mirrorRules = {mirrorRules} setmirrorRules = {setmirrorRules}
          
        />
      )
    }
    
  }

 // const {data, loading, error} = useGetDefaultId(account)
 // const {userProfiles, isUserProfilesLoading, isUserProfileError} = useGetUserProfiles(account)
 // const theChoosenProfile = userProfiles?.profiles?.items[0].id
  

    const getPostModules = () => {
  if(colectModule  === "FreeCollectModule"){
     const collectModule = {
      freeCollectModule : {
        followerOnly : collectRules
     }
     }
     return collectModule
  }else if(colectModule  === "FeeCollectModule"){
    const  collectModule  = {
      feeCollectModule : {
        amount: {
          currency : selectedCurrency,
           value : dropPrice,
        },
        recipient : account,
        referralFee : parsedReferral,
        followerOnly : collectRules,

      }
    }
    return collectModule
  }else if(colectModule  === "LimitedFeeCollectModule"){
    const collectModule = {
      limitedFeeCollectModule : {
        collectLimit : dropsSupply,
        amount: {
          currency : selectedCurrency,
           value : dropPrice,
        },
        recipient : account,
        referralFee : parsedReferral,
        followerOnly : collectRules,
      }
    }
    return collectModule
  }else if(colectModule === "LimitedTimedFeeCollectModule"){
    const collectModule = {
      limitedTimedFeeCollectModule : {
        collectLimit : dropsSupply,
        amount: {
          currency : selectedCurrency,
           value : dropPrice,
        },
        recipient : account,
        referralFee : parsedReferral,
        followerOnly : collectRules,
      }
    }

    return collectModule
  }else if (colectModule === "TimedFeeCollectModule"){
    const collectModule = {
      timedFeeCollectModule : {
        amount: {
          currency : selectedCurrency,
           value : dropPrice,
        },
        recipient : account,
        referralFee : parsedReferral,
        followerOnly : collectRules,

      }
    }

    return collectModule
  }
    }
 

const getPostRefrenceModule = () => {
  if(mirrorRules ){
    const referenceModule = {
      followerOnlyReferenceModule : true,
    }
     return referenceModule
  }else if(!mirrorRules){
    const referenceModule = {
     followerOnlyReferenceModule : false,
        }
    return referenceModule
  }
  }

    const   getDemoAuth = () => {
      if(!isAuthenticated){
        return(
          <button onClick={authenticate} className="bg-white rounded-md p-3 ">connect wallet</button>
        )
      }else if(isAuthenticated  && !isLensConnected){
        return(
          <button  className="bg-white rounded-md p-3 " onClick={signIn}>sign with lens</button>
        )
      }else {
        return(
          <p className='text-white'>{account}</p>
        )
      }
    }
  return (
    <div className='    bg-black/20  '>
         <div className='flex items-center justify-center flex-col  mb-1'>
        <h1 className='text-2xl text-white font-medium' >Upload New Album</h1>
        
        {getDemoAuth()}
         
      </div>
      <div className='flex flex-col items-center justify-center  '>
   
         <div className='w-full md:w-full lg:w-1/2 bg-white/5 min-h-full'>
          {getCurrentStep()}
         </div>
       </div>
       <div className='py-4 px-4  flex items-center justify-between md:justify-end'>
         <button className='py-2 px-8 bg-white/75 capitalize cursor-pointer rounded-md mr-4 outline-hidden' onClick={prevStep}>prev</button>
        {currentStep  === 2 ? (
                <button className='py-2 px-8 bg-white/75 capitalize cursor-pointer rounded-md'
                 onClick={() => uploadSong(description, albumName, dropTags, selectedAlbumCoverUri, AlbumArray, getPostModules, getPostRefrenceModule)}
                
                
                >create post</button>
        ): (
          <button className='py-2 px-8 bg-white/75 capitalize cursor-pointer rounded-md' onClick={nextStep}>next</button>
        )}
   
    
       </div>
    </div>
  )
}
