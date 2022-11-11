import React, {useState} from 'react'
import { collectModules, currencies } from '../assets/constants'
import { useHandleApproveModule } from '../hooks/useHandleApproveModule'
import { useGetUserProfiles, useGetApprovedAmount, useGetTopArtists,   } from '../hooks/useLens'

import HashLoader from 'react-spinners/HashLoader'
export default function Settings({latestSongs, isLatestSongsLoading, isLatestSongsError}) {
  const [selectedCurrency, setselectedCurrency] = useState("0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889")
  const [selectedModule, setselectedModule] = useState()
   const {userProfiles, isUserProfilesLoading, isUserProfileError} = useGetUserProfiles()
    const {approvedAmount, isApprovedAmountLoading, isApprovedAmountError} = useGetApprovedAmount(selectedCurrency)
    const {topArtists, isTopArtistsLoading, isTopArtistsError} = useGetTopArtists()
    const FIRST_PROFILE = userProfiles?.profiles?.items[0]
  //  console.log("user profile from settings", approvedAmount)

     const {approveModule} = useHandleApproveModule()

       if(isApprovedAmountLoading  || isUserProfilesLoading || isLatestSongsLoading || isTopArtistsLoading){
          return(
            <div className='w-full h-screen flex items-center justify-center'>
              <HashLoader color="#36d7b7" />
            </div>
          )
       }

         if( isLatestSongsError || isTopArtistsError){
             return(
              <div className='w-[100vw] h-screen flex items-center justify-center'>
                  <h3 className='text-xl font-semibold text-white capitalize'>Something  went  wrong  please check  your  connection and try again</h3>
              </div>
             ) 
         }

          if(isUserProfileError ){
            return(
              <div className='w-[100vw] h-screen flex items-center justify-center'>
                  <h3 className='text-xl font-semibold text-white capitalize'>Make  Sure  You've Signed-in with  Lens  And You Own  lens handle</h3>
              </div>
            )
          }
  return (
    <div className='w=[100%] border rounded-lg p-3 border-gray-800 '>
        <div className='my-6'>
        <h3 className='text-white text-lg capitalize font-semibold my-4'>profile id</h3>
        <input    type="text"  value={FIRST_PROFILE?.id} readOnly className='w-full  py-1 px-3 border border-gray-600
          rounded-lg bg-transparent text-gray-400 text-lg focus:border-none
        ' />
        </div>

        <div className='my-6'>
        <h3 className='text-white text-lg capitalize font-semibold my-4'>handle</h3>
        <input    type="text"  value={FIRST_PROFILE?.handle} readOnly className='w-full  py-1 px-3 border border-gray-600
          rounded-lg bg-transparent text-gray-400 text-lg focus:border-none
        ' />
        </div>

          <div className='my-6'>
            <h2 className='text-xl font-semibold text-gray-300 capitalize my-5'>Allow / Revoke collect modules</h2>
             <p className='text-gray-400'>In order to use collect feature you need to allow the module you use, you can allow and revoke the module anytime.</p>
          </div>
           <div>
           <h3 className='text-white text-lg capitalize font-semibold my-1'>Select Currency</h3> 
             <select value={selectedCurrency} onChange={e => setselectedCurrency(e.target.value)}
               className="w-full  py-2 px-3 border border-gray-600
               rounded-lg bg-[#151456] text-white  focus:border-none"
             >
               {currencies.map((item, i) => {

                return(
                  <option key={i} value={item.value}>{item.title}</option>
                )
               })}
             </select>
             
           </div>

            <div>
           
                {collectModules.map((module, i) => {
                  const approvedModules = approvedAmount?.approvedModuleAllowanceAmount.map(data => data)
                 //  console.log("the approved modules", approvedModules)
                  return(
                    <div key={i} className='flex items-center justify-between border p-3 my-3 rounded-md border-gray-500'>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-3 py-2'>
                        <module.firstIcon color='white' size={20}/>
                        <h3 className='text-xl font-semibold text-white'>{module.title}</h3>
                        </div>
                        <p className='text-gray-400'>{module.contractAddress}</p>
                      </div>
                      {
                        approvedModules && approvedModules[i]?.currency === selectedCurrency && approvedModules[i]?.allowance !== "0x00" ?
                        <button className='bg-red-700 text-white py-2 px-4 rounded-lg'>Revoke Module</button> :
                        <button className='border py-2 px-4 rounded-lg text-white' onClick={() => approveModule(selectedCurrency, module.collectModule)}>Allow Module</button>
                      }

                    </div>
                  )
                }) }
              
            </div>
    </div>
  )
}
