import React from 'react'
import LoginNavbar from '../components/layout/LoginNavbar'
import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const Login = () => {
  return (
    <>
    <LoginNavbar showGetStarted={false}/>
        <main className='h-screen flex justify-center items-center'>
            <section className='flex flex-col '>
            <form className='border rounded-2xl border-neutral-500 p-10 flex flex-col justify-center items-center'>
                
                <div className='mb-5 flex flex-col gap-3 '>
                  <h2 className='text-center text-2xl max-w-60 font-bold heading'>Welcome back to <br /> CineMood 🎬</h2>
                <p className='text-neutral-300 font-medium'>Continue your movie journey</p>
                </div>

                <div className='flex flex-col gap-3'>
                    <input type="email" className='px-3 border border-neutral-700 py-2 rounded-lg outline-none focus:border-neutral-500' placeholder='Email'/>
                    <input type="email" className='px-3 border border-neutral-700 py-2 rounded-lg outline-none focus:border-neutral-500' placeholder='Password'/>
                    
                   <div className='flex items-center gap-1'>
                    <input type="checkbox"  id="" />
                     <label htmlFor="remember">Remember me</label>
                   </div>
                <button className='bg-[#FFC509] px-3 py-2 text-black rounded-lg hover:bg-amber-300 cursor-pointer transition ease-in'>Login</button>
                </div>
                <p className='mt-3'>New to CineMood? <Link to='/register' className='underline hover:no-underline'>Register</Link></p>
            </form>
            </section>
        </main>
    <Footer />
    </>
  )
}

export default Login