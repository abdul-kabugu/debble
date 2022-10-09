import React, {useState, useRef} from 'react'
import {useMoralis, useMoralisFile} from 'react-moralis'
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'
import CircleLoader from 'react-spinners/CircleLoader'

export default function FirstStep({
  albumName, trackName, albumCover,   audioFile ,  setalbumName,
  settrackName,   setalbumCover, setaudioFile, description, setdescription,
  selectedAlbumCoverUri,  setselectedAlbumCoverUri, selectedAudioUri,
  setselectedAudioUri,  AlbumArray, setAlbumArray
}) {
   const {saveFile : saveAudioFile, isUploading: isAudioUploading, error: isUploadingAudioError } = useMoralisFile()
   const {saveFile : saveCoverFile, isUploading: isCoverUploading, error: isCoverUploadingError } = useMoralisFile()
  const [isCoverUploaded, setisCoverUploaded] = useState(false)
  const [isAudioUploaded, setisAudioUploaded] = useState(false)
 
   const  selectAudioRef = useRef()
   const  selectCoverRef  = useRef()
  const selectCoverFile = () => {
    selectCoverRef.current.click()
  }
  
  const handlUploadCover  = async (postFile) => {
    const result = await saveCoverFile("postMedia", postFile, { saveIPFS: true });
    setselectedAlbumCoverUri( result.ipfs())
    console.log(result.ipfs())
    setisCoverUploaded(true)
  }
  
  const createAlbumMusicArray = (file) => {
    setAlbumArray([...AlbumArray, {item: file,  type: "audio/mpeg", altTag: trackName,  cover: selectedAlbumCoverUri }])
     
 }

  const handleUploadAudio  = async (postFile) => {
    const result = await saveAudioFile("postMedia", postFile, { saveIPFS: true });
    setselectedAudioUri( result.ipfs())
    console.log("the audio file uri result", result.ipfs())
     const  audioFileIpfs = result.ipfs()
      createAlbumMusicArray(audioFileIpfs)
    setisAudioUploaded(true)
  }

   

   
     const addNewAudio = () => {
        setisAudioUploaded(false)
         
     }
   const selectAudioFile = () => {
  selectAudioRef.current.click()
   }

      const getCoverUploadState = () => {

        if(isCoverUploading){
          return(
            <div className='w-full h-32  border rounded-lg mt-2 flex flex-col items-center justify-center '>
              
                <CircleLoader   loading = {isCoverUploading} color="#ebf6f3"  />
              
          </div>
          )
        }else if(isCoverUploadingError){
          return(
            <div className='w-full h-32  border rounded-lg mt-2 flex flex-col items-center justify-center '>
             <p className='text-white '>Something went wrong  refresh and try again</p>
          </div>
          )
        }else if(isCoverUploaded){
          return(
            <div className='w-full h-32  border rounded-lg mt-2 flex flex-col items-center justify-center '>
              <div className='flex flex-col'>
                 <AiOutlineCheck   className='text-6xl text-white'  />
                  <h2 className='text-white font-semibold text-2xl'>Done</h2>
              </div>
          </div>
          )
        } else {
          return(
            <div className='w-full h-32  border rounded-lg mt-2 flex flex-col items-center justify-center '>
        <input type="file" ref={selectCoverRef}  onChange={e => setalbumCover(e.target.files[0])} multiple ={false} hidden accept="image/jpeg"/>
        {albumCover !== null && <p className='text-white capitalize truncate'> {albumCover.name}</p>}
         
         <button className='px-6 py-2 rounded-md bg-white  capitalize' onClick={selectCoverFile}>select file</button>
         <button className='px-6 py-2 rounded-md bg-white  capitalize mt-4' onClick={() => handlUploadCover(albumCover)}>upload cover</button>
         
        </div>
          )
        }
      }

       const getGetUploadAudioState = () => {
        if(isAudioUploading){
          return(
          <div className='w-full h-32  border rounded-lg mt-2 flex flex-col items-center justify-center '>
          
          <CircleLoader   loading = {isAudioUploading} color="#ebf6f3"  />
          
      </div> 
          )
        } else if(isUploadingAudioError){
          return(
            <div className='w-full h-32  border rounded-lg mt-2 flex flex-col items-center justify-center '>
            <p className='text-white '>Something went wrong  refresh and try again</p>
            
        </div>
          )
        }else if(isAudioUploaded && selectedAudioUri !== null){
          return(
            <div className='w-full h-32  border rounded-lg mt-2 flex flex-col items-center justify-center ' >
              <div className='flex items-center flex-col mb-3'>
              <AiOutlineCheck  className='text-2xl text-white' />
               <h2 className='text-white text-lg text-white'>have been uploaded</h2>
               </div>
            <div className='border flex items-center p-1 rounded-lg cursor-pointer' onClick={() => addNewAudio()}>
               <AiOutlinePlus className='text-white text-2xl'  />
                <button className='outline-none py-1 px-3 text-white text-lg capitalize'>add new audio</button>
            </div>
        </div>
          )
        }else {
          return(
        <div className='w-full h-32  border rounded-lg mt-2 flex flex-col items-center justify-center '>
        <input type="file" ref={selectAudioRef}  onChange={e => setaudioFile(e.target.files[0])} multiple ={false} hidden accept="audio/mp3"/>
       
           {audioFile !== null && <p className='text-white'>{audioFile.name}</p>}
         <button className='px-6 py-2 rounded-md bg-white  capitalize' onClick={selectAudioFile}>select file</button>
         <button className='px-6 py-2 rounded-md bg-white  capitalize mt-4'  onClick={() => handleUploadAudio(audioFile)} >upload audio</button>
        </div>
          )
        }
       }
  return (
    <div className='flex flex-col  items-center justify-center p-2 '>
      <div className='w-4/5 '>
       <p className='text-white text-lg capitalize  '>album name </p> 
        <input   type="text"   className='w-full mt-1 bg-inherit border py-2 px-3 rounded-lg text-white '
          placeholder='Enter album  name ' 
           value={albumName}
           onChange={e => setalbumName(e.target.value)}
        />
        </div>

        <div className='w-4/5 mt-3 '>
       <p className='text-white text-lg capitalize  '>track name </p> 
        <input   type="text"   className='w-full mt-1 bg-inherit border py-2 px-3 rounded-lg text-white '
          placeholder='Enter track name ' 
           value={trackName}
           onChange={e => settrackName(e.target.value)}
        />
        </div>

        <div className='w-4/5 mt-3 '>
       <p className='text-white text-lg capitalize  '>description </p> 
        <textarea   type="text"   className='w-full mt-1 bg-inherit border py-2 px-3 rounded-lg text-white resize-none h-28 '
          placeholder='Enter description ' 
          cols={2}
            
           value={description}
           onChange={e => setdescription(e.target.value)}
        />
        </div>

        <div className='w-4/5 mt-3  '>
       <p className='text-white text-lg capitalize  '>Album Cover </p> 
       <div>
         
          {getCoverUploadState()}
        
        
        </div>
        </div> 
        <div className='w-full md:w-4/5 mt-3  '>
       <p className='text-white text-lg capitalize  '>description </p> 
        <div>
          {getGetUploadAudioState()}
   
        </div>
        </div>

        
    </div>
  )
}
