import React, { useState } from "react"
import LoginNavbar from "../components/layout/LoginNavbar"
import Footer from "../components/layout/Footer"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../validations/authSchema"
import { registerUser, googleLogin } from "../services/authService"
import { useUser } from "../context/UserContext"
import { saveUserProfile } from "../services/profileService"

const Register = () => {
  const navigate = useNavigate()
  const { saveUser } = useUser()
  const [loading, setLoading] = useState(false)
  const [firebaseError, setFirebaseError] = useState("")

  const { register, handleSubmit, formState:{ errors } } =
    useForm({ resolver: yupResolver(registerSchema) })

  const onSubmit = async (data) => {
  if (loading) return
  setLoading(true)

  try {
    const user = await registerUser(data.email, data.password)

    const userData = {
      uid: user.uid,
      email: user.email,
      onboarded: false
    }

    saveUser(userData)
    navigate("/get-started")

  } catch (err) {
    setFirebaseError(err.message)
  } finally {
    setLoading(false)
  }
}

  const handleGoogle = async () => {
  const res = await googleLogin()

  saveUser({
    uid: res.user.uid,
    email: res.user.email,
    ...res.profile
  })

  navigate("/get-started")
}



  return (
    <>
    <LoginNavbar showGetStarted={false}/>
    <main className='h-screen flex justify-center mt-13 items-center'>

          <section className='flex'>      
            <form  onSubmit={handleSubmit(onSubmit)}  className='border rounded-2xl min-w-50 max-w-100 border-neutral-500 p-10 flex flex-col justify-center items-center'>
                
                <div className='mb-5 flex flex-col gap-3 '>
                  <h2 className='text-center text-xl max-w-60 font-bold heading'>Create your CineMood account</h2>
                <p className='text-[#aaaaaa] font-medium text-sm text-center'>Continue your movie journey</p>
                </div>

                <div className='flex flex-col gap-1'>
                    <input type="email"{...register("email")} className='px-3 border border-neutral-700 py-2 rounded-lg outline-none focus:border-[#FFC509]' placeholder='Email'/>
                    <p>{errors.email?.message}</p>

                    <input type="password" {...register("password")} className='px-3 border border-neutral-700 py-2 rounded-lg outline-none focus:border-[#FFC509]' placeholder='Password'/>
                    <p>{errors.password?.message}</p>
                    
                    <input type="password" {...register("confirmPassword")} className='px-3 border border-neutral-700 py-2 rounded-lg outline-none focus:border-[#FFC509]' placeholder='Confrim Password'/>
                    <p>{errors.confirmPassword?.message}</p>
                    
                    {firebaseError && (
                      <p className="text-red-400 text-sm mt-2">{firebaseError}</p>
                    )}

                    <button
                    disabled={loading}
                    className={`bg-[#FFC509] mt-3 px-3 py-2 font-semibold rounded-lg text-black
                    ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-amber-300"}`}
                  >
                    {loading ? "Creating account..." : "Register"}
                  </button>

                </div>
                <p className='mt-3'>Already have an account? <Link to='/login' className='underline hover:no-underline'>Login</Link></p>
                  
                  <span className='relative  border border-neutral-500 w-full mt-7'></span>
                  <p className='relative -top-3.5 px-2 bg-[#1b1b1b]'>or</p>

                 <div className='mt-3'>
                  <button onClick={handleGoogle} className='py-2 px-5 flex items-center gap-2 border cursor-pointer border-neutral-500 rounded-lg  w-full bg-neutral-800'><FcGoogle size={23} />Continue with Google</button>
                </div>

            </form>
          </section>



    </main>
    <Footer/>
    </>
  )
}

export default Register
