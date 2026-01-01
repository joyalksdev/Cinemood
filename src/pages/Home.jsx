import React from 'react'
import { useUser } from '../context/UserContext'
import RecommendationCard from '../components/cards/RecommendationCard'


const Home = () => {

  const {user} = useUser()

  return (
    <div className='px-5'>
      <div className='flex flex-col justify-center items-center py-5'>
        <h2 className='text-4xl heading font-medium'>Welcome back,<span className='font-bold pl-2'> {user.name}</span>👋</h2>
        <p className='p-2 text-lg'>Ready to find your next favorite movie?</p>
        <p className='text-amber-200'>Your mood. Your movies. Your CineMood.</p>
      </div> 
      
      <section>
        <div>
          <h2 className='font-bold heading text-2xl'>🎯 Recommended for You</h2>
          <p className='p-1 font-medium text-neutral-200/50'>Movies selected based on what you love.</p>
        </div>
        
          <RecommendationCard />
      </section>

    </div>
  )
}

export default Home