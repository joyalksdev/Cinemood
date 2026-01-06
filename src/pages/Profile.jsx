import React from 'react'
import { useUser } from '../context/UserContext'


const Profile = () => {
    const {user, logout} = useUser()
  return (
    <div className='px-6 flex-col justify-center w-full'>
        <div className='p-5 flex justify-center'>
            <img src={user.avatar}
                alt={user.name} 
                className='w-43 rounded-full border border-neutral-600'/>
        </div>

        <div className='flex justify-center'>

            <div className='p-4 border flex-col justify-between border-neutral-500 rounded-2xl w-100 '>
                <div className='flex justify-between border-b border-b-neutral-400'>
                    <span className='font-medium'>Name</span>
                    <span className='font-bold mb-2'>{user.name}</span>
                </div>

                <div className='flex justify-between mt-3 border-b border-b-neutral-400'>
                    <span className='font-medium'>Other</span>
                    <span className='font-bold mb-2'>Contents</span>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Profile