import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fetchMovieDetails } from "../../services/tmbdApi"
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbMovie } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const QuickViewModal = ({ movie, onClose }) => {
  const modalRef = useRef()
  const navigate = useNavigate()
  


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
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-zinc-900 text-white w-[90%] max-w-3xl rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-zinc-700">
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <button onClick={onClose} className="text-xl">✕</button>
            </div>

            <div className="p-6 flex flex-col md:flex-row gap-6">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="w-40 rounded-xl"
              />
              <div>
                <p className="text-sm text-gray-400 mb-3">{movie.overview}</p>
                <p>⭐ {movie.vote_average}</p>
                <p className="text-sm text-gray-500">
                  Release: {movie.release_date}
                </p>
            <div className="flex flex-col sm:flex-row mt-4  gap-3">
              <button onClick={()=> navigate(`/movie/${movie.id}`)} className="px-4 w-full py-2 flex gap-2 items-center bg-[#FFC509] cursor-pointer rounded-md hover:bg-amber-300 transition ease-in font-medium text-black"> <TbMovie  className='size-6' /> View Movie Details</button>
              <button className="px-4 py-2 flex gap-2 items-center bg-transparent w-full text-center cursor-pointer border border-neutral-400 rounded-md hover:bg-amber-300 transition font-medium hover:text-black"> <IoIosAddCircleOutline  className='size-6' /> Add to Watchlist</button>
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
