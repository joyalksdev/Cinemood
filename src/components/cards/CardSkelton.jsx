import React from 'react'

const CardSkelton = () => {
  return (
    <div className="min-w-[240px] max-w-[240px] bg-zinc-900 border border-gray-500/40 rounded-xl p-4">
       <div className="h-[320px] bg-neutral-700/40 rounded-lg animate-pulse"></div>

        <div className="mt-3 h-4 w-3/4 bg-neutral-700/40 rounded animate-pulse"></div>
        <div className="mt-2 h-3 w-1/3 bg-neutral-700/40 rounded animate-pulse"></div>

        <div className="flex justify-between mt-4">
            <div className="h-8 w-24 bg-neutral-700/40 rounded-full animate-pulse"></div>
            <div className="h-8 w-8 bg-neutral-700/40 rounded-full animate-pulse"></div>
        </div>
    </div>

  )
}

export default CardSkelton