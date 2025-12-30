import React from 'react'
import Hero from '../components/sections/Hero'
import SpotlightCard from '../components/SpotlightCard'
import { RiShiningFill } from "react-icons/ri";

const Home = () => {
  return (
    <div>
      <Hero />
        <div className='flex gap-5 mt-10'>

          <SpotlightCard spotlightColor="#ceb04f">
            <div className='p-6'>
              <RiShiningFill className='size-10'/>
            </div>
            <div className="p-6 flex flex-col gap-2 text-white">
             <span className="text-[#FFC509] text-sm tracking-wider uppercase">Hot Right Now</span>
             <h3 className="text-2xl heading font-semibold">Trending Movies</h3>
              <p className="text-gray-400">
                The most watched movies across the world today.
              </p>
              
            </div>
          </SpotlightCard>
          
        </div>
    </div>
  )
}

export default Home