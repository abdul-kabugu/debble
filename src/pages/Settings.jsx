import React from 'react'
import { useGetUserProfiles  } from '../hooks/useLens'
export default function Settings() {
   const {userProfiles, isUserProfilesLoading, isUserProfileError} = useGetUserProfiles()
    console.log("user profile from settings", userProfiles)
  return (
    <div className='w=[100%] border rounded-lg p-3 border-gray-700 h-screen'>
        <h1 className='text-white'>I'm settings</h1>
    </div>
  )
}
