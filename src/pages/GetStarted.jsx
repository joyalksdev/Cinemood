import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginNavbar from '../components/layout/LoginNavbar'
import { useUser } from "../context/UserContext"
import Stepper, {Step} from '../components/Stepper'

const GetStarted = () => {
 const { user, saveUser } = useUser()
 const [name, setName] = useState("")
 const navigate = useNavigate()

  return (

    <>
    <LoginNavbar showGetStarted={false} />
    <main>
      
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
        console.log(step);
      }}
      onFinalStepCompleted={() => {
  saveUser({
    id: Date.now(),
    name,
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=" + name,
    onboardingComplete: true,
    createdAt: new Date().toISOString()
  })
  navigate('/home')
}}
>

      <Step>
        <h2 className="heading font-bold text-2xl mb-2">Welcome to CineMood 🎬</h2>
        <p>Discover movies that match your taste. Let’s set up your profile in under a minute.</p>
      </Step>
      <Step>
        <h2 className="heading font-bold text-2xl mb-2">What should we call you?</h2>
        <p>This name will appear on your profile and watchlist.</p>
        <input type="text" onChange={(e)=>setName(e.target.value)} className="mt-3 py-2 px-3 outline-none border border-neutral-700 transition-all ease-in-out focus:border-neutral-500 rounded-lg" placeholder="Display Name" />
      </Step>
      <Step>
        <h2 className="heading font-bold text-2xl mb-2">Choose your look</h2>
        <p>Pick one of our avatars or upload your own photo.</p>
        <input  className="px-3 py-2 mt-2 rounded-lg w-60 hover:bg-neutral-700 cursor-pointer border transition-all ease-in-out border-neutral-600" type="file" />

      </Step>
      <Step>
        <h2 className="heading font-bold text-2xl mb-2">Welcome to CineMood, {name || "Friend"}!</h2>
        <p>Your personalized movie world is ready.</p>
      </Step>
    </Stepper>

    </main>
  </>
  )
}

export default GetStarted
