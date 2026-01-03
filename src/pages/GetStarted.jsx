import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginNavbar from '../components/layout/LoginNavbar'
import { useUser } from "../context/UserContext"
import Stepper, {Step} from '../components/ui/Stepper'
import { button } from "motion/react-client"

const GENRES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 16, name: "Animation" },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "ml", label: "Malayalam" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" }
];


const GetStarted = () => {
  const navigate = useNavigate()
 const { user, saveUser } = useUser()
 const [name, setName] = useState("")
 const [genres, setGenres] = useState([])
 const [language, setLanguage] = useState("")
 
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
      genres,
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=" + name,
      language,
      onboardingComplete: true,
      createdAt: new Date().toISOString()
    })
    navigate("/")
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
        <h2 className="heading font-bold text-2xl mb-2">What do you love watching?</h2>
        <p>Select your favorite genres.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {GENRES.map(g => (
            <button
              key={g.id}
              onClick={() =>
                setGenres(prev =>
                  prev.includes(g.id)
                    ? prev.filter(id => id !== g.id)
                    : [...prev, g.id]
                )
              }
              className={`px-3 py-2 rounded-lg border ${
                genres.includes(g.id)
                  ? "bg-[#FFC509] text-black"
                  : "border-neutral-600 hover:bg-neutral-700"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </Step>

    <Step>
      <h2 className="heading font-bold text-2xl mb-2">Preferred Language</h2>
      <p>Which language do you mostly watch movies in?</p>

      <div className="flex flex-wrap gap-3 mt-4">
        {LANGUAGES.map(l => (
          <button
            key={l.code}
            onClick={() => setLanguage(l.code)}
            className={`px-4 py-2 rounded-lg border ${
              language === l.code
                ? "bg-[#FFC509] text-black"
                : "border-neutral-600 hover:bg-neutral-700"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
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
