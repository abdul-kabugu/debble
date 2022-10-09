import React, {useState} from 'react'
import {MdCollections, MdOutlineCollections, MdOutlineCollectionsBookmark} from 'react-icons/md'
import  {AiOutlineClose, AiOutlineLock} from 'react-icons/ai'
import {GiMoneyStack} from 'react-icons/gi'
import {TbTarget} from 'react-icons/tb'
import {BiTime} from 'react-icons/bi'
import Modal from './Modal'
import ModalTwo from './ModalTwo'
export default function SecondStep({
  dropPrice, setdropPrice ,  setcolectModule ,  colectModule,
  selectedCurrency,  setselectedCurrency, isCollectFee,  setisCollectFee ,
  isLimiteCollectFee,   refferlFee ,  setrefferalFee ,  collectRules,  setcollectRules,
  setisLimiteCollectFee,  dropsSupply,  setdropsSupply, toggleIsLimitedFeeToCollect,
  handleCollectModule, toggleIsFeeToCollect
}) {
   

   

   /* const  toggleIsFeeToCollect = () => {
       isCollectFee ?  setisCollectFee(false) : setisCollectFee(true)
    }
    const  toggleIsLimitedFeeToCollect = () => {
      isLimiteCollectFee ? setisLimiteCollectFee(false) : setisLimiteCollectFee(true)
   }
    
    const handleCollectModule = (toggler, module) => {
      setcolectModule(module)
      toggler()
    }*/

      
  return (
    <div className='p-3 flex flex-col items-center justify-center'>
      {isLimiteCollectFee && (
        <ModalTwo>
           <div className=' flex items-center justify-between mb-4'>
             <h2 className='text-lg capitalize font-bold'>Select collect module</h2>
              <AiOutlineClose  className='cursor-pointer text-xl' onClick={() => toggleIsLimitedFeeToCollect()} />
           </div>
           <div>
            <select value={selectedCurrency} onChange={e => setselectedCurrency(e.target.value)} className='w-full bg-transparent text-white outline-none py-2 px-2 border rounded-lg'>
            <option value="0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889" style={{color: "white", backgroundColor: "black"}}>WMATIC</option>
            <option value="0x3C68CE8504087f89c640D02d133646d98e64ddd9" style={{color: "white", backgroundColor: "black"}}>WETH</option>
            <option value="0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e" style={{color: "white", backgroundColor: "black"}}>USDC</option>
            <option value="0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F" style={{color: "white", backgroundColor: "black"}}>DAI</option>
            <option value="0x7beCBA11618Ca63Ead5605DE235f6dD3b25c530E" style={{color: "white", backgroundColor: "black"}}>TOUCAN</option>
            </select>
            <div className='mt-3'>
              <h4 className='text-lg capitalize font-semibold'>collect limit</h4>
              <input  value={dropsSupply} onChange={e => setdropsSupply(e.target.value)} placeholder="100" className="w-full mt-1 bg-transparent border rounded-lg py-2 px-2"            />
             </div>
             <div className='mt-3'>
              <h4 className='text-lg capitalize font-semibold'>amount</h4>
              <input  value={dropPrice} onChange={e => setdropPrice(e.target.value)} placeholder="100" className="w-full mt-1 bg-transparent border rounded-lg py-2 px-2"            />
             </div>
             <div className='mt-3'>
              <h4 className='text-lg capitalize font-semibold'>Referral Fee</h4>
              <input  value={refferlFee} onChange={e => setrefferalFee(e.target.value)} placeholder="10%" className="w-full mt-1 bg-transparent border rounded-lg py-2 px-2"            />
             </div>

             <div className='mt-3'>
              <h4 className='text-lg capitalize font-semibold'>Permission</h4>
               <select value={collectRules} onChange={e => setcollectRules(e.target.value)} className="w-full bg-transparent py-2 px-2 border rounded-lg mt-1">
               <option value={false} style={{backgroundColor: "black", color: "white"}}>Everyone Can Collect</option>
            <option value={true} style={{backgroundColor: "black", color: "white"}} disabled>Only Followers Can Collect</option>
               </select>
             </div>
              <button className='w-full bg-white text-black capitalize mt-4 rounded-lg py-2 font-semibold cursor-pointer' onClick={toggleIsLimitedFeeToCollect}>Save </button>
           </div>
        </ModalTwo>
      )}
      {isCollectFee &&(
         <Modal>
           <div className=' flex items-center justify-between mb-4'>
             <h2 className='text-lg capitalize font-bold'>Select collect module</h2>
              <AiOutlineClose  className='cursor-pointer text-xl' onClick={() => toggleIsFeeToCollect()} />
           </div>
           <div>
            <select value={selectedCurrency} onChange={e => setselectedCurrency(e.target.value)} className='w-full bg-transparent text-white outline-none py-2 px-2 border rounded-lg'>
            <option value="0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889" style={{color: "white", backgroundColor: "black"}}>WMATIC</option>
            <option value="0x3C68CE8504087f89c640D02d133646d98e64ddd9" style={{color: "white", backgroundColor: "black"}}>WETH</option>
            <option value="0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e" style={{color: "white", backgroundColor: "black"}}>USDC</option>
            <option value="0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F" style={{color: "white", backgroundColor: "black"}}>DAI</option>
            <option value="0x7beCBA11618Ca63Ead5605DE235f6dD3b25c530E" style={{color: "white", backgroundColor: "black"}}>TOUCAN</option>
            </select>

             <div className='mt-3'>
              <h4 className='text-lg capitalize font-semibold'>amount</h4>
              <input  value={dropPrice} onChange={e => setdropPrice(e.target.value)} placeholder="100" className="w-full mt-1 bg-transparent border rounded-lg py-2 px-2"            />
             </div>
             <div className='mt-3'>
              <h4 className='text-lg capitalize font-semibold'>Referral Fee</h4>
              <input  value={refferlFee} onChange={e => setrefferalFee(e.target.value)} placeholder="10%" className="w-full mt-1 bg-transparent border rounded-lg py-2 px-2"            />
             </div>

             <div className='mt-3'>
              <h4 className='text-lg capitalize font-semibold'>Permission</h4>
               <select value={collectRules} onChange={e => setcollectRules(e.target.value)} className="w-full bg-transparent py-2 px-2 border rounded-lg mt-1">
               <option value={false} style={{backgroundColor: "black", color: "white"}}>Everyone Can Collect</option>
            <option value={true} style={{backgroundColor: "black", color: "white"}} disabled>Only Followers Can Collect</option>
               </select>
             </div>
              <button className='w-full bg-white text-black capitalize mt-4 rounded-lg py-2 font-semibold cursor-pointer' onClick={toggleIsFeeToCollect}>Save </button>
           </div>
         
        </Modal>
      )}
      <div className='w-full md:4/5'>
      <div className='flex items-center  self-start '>
        <MdOutlineCollections  className='text-white text-2xl mr-2 ' />
        <h1 className='text-white text-lg capitalize'>Select collect module</h1>
      </div>
    <div className='w-full mt-5 flex flex-col items-center justify-center '>
      <div className='w-full h-16 border rounded-lg cursor-pointer p-2' onClick={() => handleCollectModule(toggleIsFeeToCollect, "FeeCollectModule")}>
         <div className='flex items-center '>
          <MdCollections className='text-lg text-white mr-2' />
          <p className='text-sm text-white'>Fee collect</p>
          </div>
          <p className='text-sm text-white/70 mt-2'>0xeb4f3EC9d01856Cec2413bA5338bF35CeF932D82</p>
       </div>

       <div className='w-full h-16 border rounded-lg cursor-pointer p-2 mt-5' onClick={() => handleCollectModule(toggleIsLimitedFeeToCollect, "LimitedFeeCollectModule")}>
         <div className='flex items-center '>
          <TbTarget  className='text-lg text-white mr-2'  />
          <MdCollections className='text-lg text-white mr-2' />
          <p className='text-sm text-white'>Limited Fee Collect</p>
          </div>
          <p className='text-sm text-white/70 mt-2'>0xFCDA2801a31ba70dfe542793020a934F880D54aB</p>
       </div>

       <div className='w-full h-16 border rounded-lg cursor-pointer p-2 mt-5' onClick={() => handleCollectModule(toggleIsLimitedFeeToCollect, "LimitedTimedFeeCollectModule")}>
         <div className='flex items-center '>

          <TbTarget   className='text-lg text-white mr-2'   />
          <BiTime  className='text-lg text-white mr-2' />
          <MdCollections className='text-lg text-white mr-2' />
          <p className='text-sm text-white'>Limited Time Fee Collect</p>
          </div>
          <p className='text-sm text-white/70 mt-2'>0xDa76E44775C441eF53B9c769d175fB2948F15e1C</p>
       </div>

       <div className='w-full h-16 border rounded-lg cursor-pointer p-2 mt-5' onClick={() => handleCollectModule(toggleIsLimitedFeeToCollect, "TimedFeeCollectModule")}>
         <div className='flex items-center '>
          <MdCollections className='text-lg text-white mr-2' />
          <BiTime  className='text-lg text-white mr-2' />
          <p className='text-sm text-white'>Timed Fee Collect </p>
          </div>
          <p className='text-sm text-white/70 mt-2'>0x36447b496ebc97DDA6d8c8113Fe30A30dC0126Db</p>
       </div>

       <div className='w-full h-16 border rounded-lg cursor-pointer p-2 mt-5' onClick={() => setcolectModule("FreeCollectModule")}>
         <div className='flex items-center '>
          <MdCollections className='text-lg text-white mr-2' />
          <p className='text-sm text-white'>Free collect</p>
          </div>
          <p className='text-sm text-white/70 mt-2'>0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c</p>
       </div>
      </div>
      
      </div>
     
    </div>
  )
}
