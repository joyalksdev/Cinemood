import React from "react"
import LoginNavbar from "../components/layout/LoginNavbar"
import Footer from "../components/layout/Footer"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../validations/authSchema"
import { loginUser, googleLogin } from "../services/authService"
import { useUser } from "../context/UserContext"
import { getUserProfile } from "../services/profileService"


const Login = () => {
  const navigate = useNavigate()
  const { saveUser } = useUser()

  const { register, handleSubmit, formState:{ errors } } =
    useForm({ resolver: yupResolver(loginSchema) })

  const onSubmit = async (data) => {
  try {
    const res = await loginUser(data.email, data.password)

    const userData = {
      uid: res.user.uid,
      email: res.user.email,
      ...res.profile
    }

    saveUser(userData)

    navigate(res.profile?.onboarded ? "/home" : "/get-started")

  } catch (err) {
    alert("Login failed: " + err.message)
  }
}

const handleGoogle = async () => {
  const res = await googleLogin()

  saveUser({
    uid: res.user.uid,
    email: res.user.email,
    ...res.profile
  })

  navigate(res.profile.onboarded ? "/home" : "/get-started")
}


  return (
    <>
      <LoginNavbar showGetStarted={false} />
      <main className="h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border rounded-2xl border-neutral-500 bg-[#1b1b1b] p-10 flex flex-col justify-center items-center"
        >
          <div className="mb-5 flex flex-col gap-3 ">
            <h2 className="text-center text-xl max-w-60 font-bold heading">
              Welcome back to <br /> CineMood 🎬
            </h2>
            <p className="text-neutral-300 font-medium">
              Continue your movie journey
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <input
              {...register("email")}
              className="px-3 border border-neutral-700 py-2 rounded-lg outline-none focus:border-[#FFC509]"
              placeholder="Email"
            />
            <p>{errors.email?.message}</p>

            <input
              type="password"
              {...register("password")}
              className="px-3 border border-neutral-700 py-2 rounded-lg outline-none focus:border-[#FFC509]"
              placeholder="Password"
            />
            <p>{errors.password?.message}</p>

            <div className="flex items-center gap-1">
              <input type="checkbox" id="" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button className="bg-[#FFC509] px-3 py-2 text-black rounded-lg hover:bg-amber-300 cursor-pointer transition ease-in">
              Login
            </button>
          </div>
          <p className="mt-3">
            New to CineMood?{" "}
            <Link to="/register" className="underline hover:no-underline">
              Register
            </Link>
          </p>

          <span className="relative  border border-neutral-500 w-full mt-7"></span>
          <p className="relative -top-3.5 px-2 bg-[#1b1b1b]">or</p>

          <div className="mt-3">
            <button
              onClick={handleGoogle}
              className="py-2 px-5 flex items-center gap-2 border border-neutral-500 rounded-lg  w-full bg-neutral-800"
            >
              <FcGoogle size={23} />
              Continue with Google
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Login
