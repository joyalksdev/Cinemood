import React from "react";
import { fetchMovieReviews, fetchMovieDetails } from "../services/tmbdApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);

  

  useEffect(() => {
    fetchMovieDetails(id).then(setMovie);
  }, [id]);

  useEffect(() => {
    fetchMovieReviews(id, reviewPage).then((data) => {
      setReviews((prev) =>
        reviewPage === 1 ? data.results : [...prev, ...data.results]
      );
      setTotalReviews(data.total_results);
    });
  }, [id, reviewPage]);

  if (!movie)
    return <p className="text-white text-center mt-20">Loading movie...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black rounded-2xl text-white py-16 px-6">
      

      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
        <header className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-52 h-72 object-cover rounded-2xl shadow-xl"
          />

          <div className="flex-1">
            <h2 className="text-4xl font-bold">{movie.title}</h2>
            <p className="text-neutral-400 mt-2">
              ⭐ {movie.vote_average} / 10 • {totalReviews} Reviews
            </p>

            <p className="text-neutral-300 mt-4 max-w-xl leading-relaxed">
              {movie.overview}
            </p>

            <button className="px-4 py-2 mt-2 bg-yellow-400 text-black font-semibold rounded-lg">Post Review</button>

          </div>
        </header>
      </div>

      <section className="py-10">
        <h2 className="text-2xl font-bold heading">⭐ User Reviews</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-neutral-900/70 p-4 rounded-xl border border-white/10"
            >
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium">{r.author}</p>
                {r.author_details?.rating && (
                  <span className="text-[#FFC509] text-sm">
                    ⭐ {r.author_details.rating}/10
                  </span>
                )}
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed line-clamp-4">
                {r.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieReviews;
