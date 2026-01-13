import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TbMovie } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import WatchlistButton from "../ui/WatchlistButton"
import mHPlaceholder from "../../assets/m-h-placeholder.png"

const QuickViewModal = ({ movie, onClose }) => {
  const modalRef = useRef()
  const navigate = useNavigate()


  const backdrop = movie.backdrop_path?.trim()

  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900/90 backdrop-blur-xl text-white w-[92%] max-w-200 
            rounded-3xl shadow-2xl overflow-hidden border border-white/10"
          >
       
            <button
              onClick={onClose}
              className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center 
              rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-yellow-400 
              hover:text-black transition z-10"
            >
              ✕
            </button>

         
            <div className="relative h-[280px] md:h-[340px]">
             <img src={backdrop 
                  ? `https://image.tmdb.org/t/p/original${backdrop}` 
                  : mHPlaceholder}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6">
                <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
                  {movie.title}
                </h2>

                <div className="flex items-center gap-3 mt-2 text-sm text-neutral-300">
                  <span className="px-2 py-1 bg-amber-100 text-black border rounded-md font-semibold">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </span>
                  <span>{movie.release_date}</span>
                </div>
              </div>
            </div>


            <div className="p-6">
              <p className="text-sm leading-relaxed text-neutral-300 line-clamp-4">
                {movie.overview}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="px-6 py-2.5 flex gap-2 items-center bg-yellow-400 
                  rounded-lg hover:bg-yellow-300 transition font-semibold text-black shadow-md"
                >
                  <TbMovie className="text-lg" /> View Movie Details
                </button>

                <div className="backdrop-blur-md bg-white/5 border border-white/10 
                rounded-lg hover:bg-white/10 transition">
                  <WatchlistButton movie={movie} variant="modal" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default QuickViewModal
