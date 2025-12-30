import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const LoginFooter = () => {
  return (
    <footer className='bg-black mt-10 w-full p-5 flex flex-col items-center'>
      <div className='flex gap-5 justify-between mb-5 py-8 px-2 items-start'>

        <div className='flex flex-col max-w-70 gap-3'>
          <Link to='/'>
            <div className='text-[25px] heading flex gap-3 items-center '>
              <img src={logo} alt="Logo" className='h-8 w-auto' />
              <h2 className='font-medium'><span className='text-[#FFC509] font-bold m-0'>Cine</span>mood</h2>         
            </div>
          </Link>
            <p>Discover cinema the way it was meant to be explored. Your personal space to find, save and fall in love with movies again.</p>           
        </div>

        <div className='flex flex-col gap-2 px-10'>
          <h2 className='font-bold text-xl mb-2'>Explore</h2>
          <Link className="text-md hover:underline transition-all ease-in" >Trending</Link>
          <Link className="text-md hover:underline transition-all ease-in" >New Arrival</Link>
          <Link className="text-md hover:underline transition-all ease-in" >Top Rated</Link>
          <Link className="text-md hover:underline transition-all ease-in" >Genres</Link>
          <Link className="text-md hover:underline transition-all ease-in" >Watchlist</Link>
        </div>

        <div className='flex flex-col gap-2 px-10'>
          <h2 className='font-bold text-xl mb-2'>Support</h2>
          <Link className="text-md hover:underline transition-all ease-in" >FAQ</Link>
          <Link className="text-md hover:underline transition-all ease-in" >Help Centre</Link>
          <Link className="text-md hover:underline transition-all ease-in" >Contact Us</Link>
          <Link className="text-md hover:underline transition-all ease-in" >Report a Problem</Link>
        </div>

        <div className='flex flex-col gap-2 px-10'>
          <h2 className='font-bold text-xl mb-2'>Legal</h2>
          <Link className="text-md hover:underline transition-all ease-in" >Privacy Policy</Link>
          <Link className="text-md hover:underline transition-all ease-in" >Terms & Conditions</Link>
          <Link className="text-md hover:underline transition-all ease-in" >Cookie Policy</Link>
          <Link className="text-md hover:underline transition-all ease-in" >Copyright</Link>
        </div>

      </div>
        <p>&copy; 2025 CineMood. All rights reserved.</p>
    </footer>
  )
}

export default LoginFooter