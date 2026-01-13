import React, { useState } from 'react'
import { FaSmile, FaSadTear, FaFire, FaHeart } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'


const moods = [
  { label: "Happy", icon: <FaSmile />, color: "bg-yellow-400/20 text-yellow-300", genres: [35, 16] }, // Comedy, Animation
  { label: "Romantic", icon: <FaHeart />, color: "bg-pink-400/20 text-pink-300", genres: [10749, 18] }, // Romance, Drama
  { label: "Thrilling", icon: <FaFire />, color: "bg-red-400/20 text-red-300", genres: [28, 53] }, // Action, Thriller
  { label: "Sad", icon: <FaSadTear />, color: "bg-blue-400/20 text-blue-300", genres: [18] }, // Drama
]

const MoodMatcher = () => {
  const [activeMood, setActiveMood] = useState(null)
  const [typedMood, setTypedMood] = useState("")
  const navigate = useNavigate()

  return (
    <section className="relative py-10   rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden">

    
      <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-[120px] rounded-full -top-20 -left-20" />
      <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full bottom-0 right-0" />

      <h2 className="text-3xl px-3 md:text-5xl font-bold heading text-center">
        How Are You Feeling Today?
      </h2>
      <p className="text-sm md:text-md text-neutral-400 px-4 mt-2 text-center max-w-xl">
        Choose your mood and let us recommend movies that perfectly match your emotions.
      </p>

    
      <div className="flex flex-wrap justify-center px-10 gap-4 mt-5">
        {moods.map((mood, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveMood(mood)
              setTypedMood("")
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border cursor-pointer border-white/10 
            backdrop-blur-md ${mood.color} hover:scale-105 transition
            ${activeMood?.label === mood.label ? "ring-2 ring-yellow-400 scale-105" : ""}`}
          >
            {mood.icon}
            <span className="font-medium">{mood.label}</span>
          </button>
        ))}
      </div>


      
      <div className="mt-5 flex justify-center w-full max-w-md">
        <input value={typedMood} onChange={(e) => {
            setTypedMood(e.target.value)
            setActiveMood(null)
          }}
          placeholder="Or type your mood… e.g. nostalgic, lonely"
          className="w-76 md:w-full px-5 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 
          focus:border-yellow-400 outline-none text-white placeholder:text-neutral-400"
        />
      </div>

      
      <button onClick={() => {
          if (activeMood) {
            navigate(`/mood/${activeMood.label.toLowerCase()}`, {
              state: { genres: activeMood.genres, mood: activeMood.label }
            })
          } else if (typedMood.trim()) {
            navigate(`/mood/custom`, {
              state: { mood: typedMood }
            })
          }
        }}
        className="mt-6 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition shadow-lg disabled:opacity-50"
        disabled={!activeMood && !typedMood.trim()}>
        Find My Movies 🎬
      </button>
      


    </section>
  )
}

export default MoodMatcher
