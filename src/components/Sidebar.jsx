import {NavLink} from 'react-router-dom'
//import {logo} from '../assets'
import {links} from '../assets/constants'
import {RiCloseLine} from 'react-icons/ri'
import { useState } from 'react'
import {BiMusic} from 'react-icons/bi'
import {HiOutlineMenu} from 'react-icons/hi'

const Sidebar = () => {
const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false)

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
  </div>
)
  return (
 <>
 <div className='hidden md:flex flex-col w-[240px] py-10 px-4
  bg-black 
 '>
  <BiMusic  className='text-white w-full' size={50}/>
  <NavLinks  />
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
 </div>
 </>
  )
}

export default Sidebar;
