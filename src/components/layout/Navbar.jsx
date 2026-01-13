import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { HiOutlineSearch, HiOutlineMenuAlt3, HiX } from "react-icons/hi"
import DropDownProfile from '../ui/DropDownProfile'
import { useUser } from '../../context/UserContext'
import SearchBar from '../search/SearchBar'


const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-linear-to-b from-black/90 to-transparent backdrop-blur-md px-6 py-5 flex items-center justify-between text-white">

        <Link to="/home" className="flex items-center gap-3 text-[25px] heading">
          <img src={logo} alt="Logo" className="h-8" />
          <h2><span className="text-[#FFC509] font-bold">Cine</span>Mood</h2>
        </Link>

        <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

     
        {!isSearchOpen && (
          <ul className="hidden lg:flex gap-10">
            <NavLink to='/home' className={({isActive}) => isActive ? "text-[#FFC509] transition-all ease-linear" : "text-white hover:text-amber-500 transition-all ease-linear" } >Home</NavLink>
            <NavLink to='browse' className={({isActive}) => isActive ? "text-[#FFC509] transition-all ease-linear" : "text-white hover:text-amber-500 transition-all ease-linear" } >Browse</NavLink>
            <NavLink to='watchlist' className={({isActive}) => isActive ? "text-[#FFC509] transition-all ease-linear" : "text-white hover:text-amber-500 transition-all ease-linear" } >Watchlist</NavLink>
          </ul>
        )}

      
        {!isSearchOpen && (
          <div className="flex items-center gap-4">

    
            <button onClick={() => setIsSearchOpen(true)} className="lg:hidden text-2xl">
              <HiOutlineSearch />
            </button>

           <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="lg:hidden text-3xl transition-transform ease-in duration-500"
            >
            {isMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
            </button>

            <DropDownProfile />
          </div>
        )}
      </nav>
      


      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 text-xl transition-all duration-300
        ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>

            <NavLink to='/home' onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? "text-[#FFC509]" : "text-white focus:text-amber-500 transition-all ease-linear" } >Home</NavLink>
            <NavLink to='browse' onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? "text-[#FFC509]" : "text-white focus:text-amber-500 transition-all ease-linear" } >Browse</NavLink>
            <NavLink to='watchlist' onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? "text-[#FFC509]" : "text-white focus:text-amber-500 transition-all ease-linear" } >Watchlist</NavLink>

      </div>
    </>
  )
}

export default Navbar
