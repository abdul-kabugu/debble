import { useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Swiper, SwiperSlide} from 'swiper/react'
import {FreeMode} from "swiper"
import {playPause, setActiveSong} from '../redux/features/playerSlice'
import {Link} from 'react-router-dom'
import PlayPause from "./PlayPause";
import { useGetTopArtists } from "../hooks/useLens";
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'
import { truncateString } from "../hooks/useSubString";
import "swiper/css"

//import "swiper/css/freemode"

const TopPlay = ({latestSongs, isLatestSongsLoading,  isLatestSongsError}) => {
const dispatch =  useDispatch()
const {activeSong, isPlaying}  = useSelector((state) => state.player )
const deveRef = useRef()
const {topArtists, isTopArtistsLoading, isTopArtistsError} = useGetTopArtists()
 // console.log("the top artists list", topArtists)
  useEffect(() => {
     deveRef.current.scrollIntoView({behavior : "smooth"})
  })
  
const handlePauseClick = () => {
  dispatch(playPause(false))
 }
 const handlePlayClick = (song, data, i) => {
   dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
 }

   if(isLatestSongsLoading || isTopArtistsLoading){
    return <p ref={deveRef}></p>
   }

   if(isLatestSongsError || isTopArtistsError){
    return <p ref={deveRef}></p>
   }

   const TopChirtCard = ({song, i, handlePlay, handlePause, isPlaying, activeSong}) => (
    <div className="flex flex-row w-full items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
       <h3 className="font-bold mr-3 text-white text-base">{i + 1}</h3>
        <div className="flex flex-1 flewx-row justify-between  items-center">
         <img  src={song?.metadata.image} alt={song?.metadata.name} className="w-10 h-10 rounded-lg"  />
          <div className="flex-1 flex-col flex justifuy-center mx-3">
            
           <Link to={`/songs/${song?.id}`}>
            <p className="text-lg  text-gray-300 font-bold ">{truncateString(song? song?.metadata.name : "", 10)}</p>
           </Link>
             <div className="flex flex-row">
           <Link to={`/${song?.id}`}>
            <p className="text-ase  text-white font-bold truncate ">{song?.profile.name || song?.profile.handle}</p>
           </Link>
           
           </div>
          </div>
          <PlayPause 
           isPlaying={isPlaying}
           activeSong = {activeSong}
           song = {song}
            handlePlay = {() => handlePlay(song, latestSongs, i)}
            handlePause = {handlePause}
          />
        </div>
    </div>
   )
  return(
  <div ref={deveRef} className=" xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[300px] max-w-full 
   flex flex-col"
  >
    <div className="w-full flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-white font-bold text-2xl capitalize">latest songs</h2>
          <Link  className="capitalize text-gray-300 cursor-pointer">see more</Link>
      </div>
       <div className="mt-4 flex flex-col gap-1">
         {latestSongs?.explorePublications.items.map((song, i) => (
          <TopChirtCard  key={i}
           song= {song}
           i= {i}
           isPlaying = {isPlaying}
           activeSong = {activeSong}
           handlePlay = {handlePlayClick}
            handlePause = {handlePauseClick}
          />
         ))}
       </div>
  </div>

  <div className="w-full flex flex-col mt-4">
  <div className="flex flex-row items-center justify-between">
        <h2 className="text-white font-bold text-2xl capitalize">Top Artists</h2>
          <Link  className="capitalize text-gray-300 cursor-pointer">see more</Link>
      </div>

   <Swiper
    slidesPerView="auto"
    spaceBetween={15}
    freeMode
    centeredSlides
    centeredSlidesBounds
    modules={[FreeMode]}
     className="mt-2"
   >
    {topArtists?.exploreProfiles.items?.filter((singer) => singer.picture !== null)
      .map((artist, i) => {
      

        return(
          <SwiperSlide key={i} style={{width : "20%",}}
            className='shadow-lg rounded-full animate-sliderright'
          >
         <Link to={`artists/${artist?.id}`}>
          <img  src={artist?.picture?.original?.url} alt={artist?.name || artist?.handle} 
            className="rounded-full object-cover w-full"
          />
         </Link>
          </SwiperSlide>
        )
      })
    }
   </Swiper>
  </div>
  </div>
  )
}

export default TopPlay;
