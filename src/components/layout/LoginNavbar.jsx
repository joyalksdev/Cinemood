import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
const LoginNavbar = () => {
  return (
  
    <nav className='fixed top-0 left-0 md:w-full lg:w-full sm:w-full z-50 bg-linear-to-b from-black/90 to-transparent backdrop-blur-md px-10 py-5 flex items-center justify-between text-white'>
        
        <Link to='/get-started'> 
        <div className='text-[25px] heading flex gap-3 items-center '>
            <img src={logo} alt="Logo" className='h-8 w-auto' />
            <h2 className='font-medium'><span className='text-[#FFC509] font-bold m-0'>Cine</span>mood</h2>
        </div>
        </Link>

        

        

        <div>
            Language
        </div>

    </nav>
  )
}

export default LoginNavbar