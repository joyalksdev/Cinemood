import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from '../../context/UserContext';

const DropDownProfile = () => {
    
    const { user, logout } = useUser()
    
    const [openDropdown, setOpenDropdown] = useState(false)
    const dropdownRef = useRef(null)
    useEffect(()=>{
        const handClickOutside = (event) =>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setOpenDropdown(false)
            }
        }
        document.addEventListener('mousedown',handClickOutside)
        
        return()=>{
            document.addEventListener('mousedown',handClickOutside)
        }

    },[])

    return (
    <div className='relative'>
        <img src='https://plus.unsplash.com/premium_photo-1765874178169-48f97f17bda6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D' className="w-10 h-10 rounded-full object-cover cursor-pointer" onClick={()=> setOpenDropdown(!openDropdown)} alt="Profile"/>

        {
            openDropdown && (
                <div ref={dropdownRef} className={`absolute right-0 mt-3 w-34 profile-menu border border-gray-700 rounded-xl shadow-xl overflow-hidden transition-all duration-200 opacity-100 scale-100" }`}>
                    <h2 className='text-center py-2 px-5 text-lg font-bold'>{user.name}</h2>
                    <NavLink to='my-list' className='block px-4 py-2 w-ful text-left hover:bg-[#1f1f1f]'>My-List</NavLink>
                    <NavLink to='profile' className='block px-4 py-2 w-ful text-left hover:bg-[#1f1f1f]'>Profile</NavLink>
                    <button onClick={logout} className='w-full text-red-400 px-4 py-2 hover:bg-[#1f1f1f]'>Log Out</button>
                </div>
            )
        }

    </div>
  )
}

export default DropDownProfile