import React from 'react'
import logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { HiOutlineSearch } from "react-icons/hi";
import DropDownProfile from '../ui/DropDownProfile';
import { useUser } from '../../context/UserContext';
import SearchBar from '../search/SearchBar';


const Navbar = () => {
   const { user, logout } = useUser()
  return (
    <nav className='fixed top-0 left-0 md:w-full lg:w-full sm:w-full z-50 bg-linear-to-b from-black/90 to-transparent backdrop-blur-md px-10 py-5 flex items-center justify-between text-white'>
        
        <Link to='/'> 
        <div className='text-[25px] heading flex gap-3 items-center '>
            <img src={logo} alt="Logo" className='h-8 w-auto' />
            <h2 className='font-medium'><span className='text-[#FFC509] font-bold m-0'>Cine</span>Mood</h2>
        </div>
        </Link>

        <ul className='flex gap-10 '>
            <NavLink to='/home' className={({isActive}) => isActive ? "text-[#FFC509] transition-all ease-linear" : "text-white hover:text-amber-500 transition-all ease-linear" } >Home</NavLink>
            <NavLink to='browse' className={({isActive}) => isActive ? "text-[#FFC509] transition-all ease-linear" : "text-white hover:text-amber-500 transition-all ease-linear" } >Browse</NavLink>
            <NavLink to='watchlist' className={({isActive}) => isActive ? "text-[#FFC509] transition-all ease-linear" : "text-white hover:text-amber-500 transition-all ease-linear" } >Watchlist</NavLink>
        </ul>

        {/* <div className='hidden items-center max-w-full lg:max-w-full md:max-w-50 sm:hidden backdrop-blur-xs md:flex lg:flex px-3 py-1 bg-transparent border border-stone-100/30 rounded-lg'>
            <HiOutlineSearch />
            <input type="text"className='outline-none px-2 py-1 rounded text-white placeholder-white' placeholder='Search' />
        </div> */}

        <SearchBar />

        <DropDownProfile />


    </nav>
  )
}

export default Navbar