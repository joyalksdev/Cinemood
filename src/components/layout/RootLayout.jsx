import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'
import Footer from './Footer'

const RootLayout = () => {
  return (
    <div className='min-h-screen bg-neutral-900 text-white overflow-hidden'>



        <div className="relative z-10">
            <Navbar />
            <main className='px-6 pt-24 min-h-screen'>
                <Outlet />
            </main>
            <Footer />
        </div>
    </div>
  )
}

export default RootLayout