import { useEffect, useState } from "react";
import { fetchMovieDetails, IMG, IMG_ORIGINAL } from "../api/tmdb";

export default function MovieModal({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setMovie(null);
    fetchMovieDetails(movieId)
      .then(setMovie)
      .finally(() => setLoading(false));
  }, [movieId]);

  // Fecha com ESC
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Bloqueia scroll do body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const trailer = movie?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const cast = movie?.credits?.cast?.slice(0, 10) ?? [];
  const genres = movie?.genres ?? [];
  const year = movie?.release_date?.slice(0, 4);
  const runtime = movie?.runtime;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0D1526] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 glass rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#1D4ED8]/40 transition-all text-lg"
        >
          ✕
        </button>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-2 border-[#1D4ED8] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && movie && (
          <>
            {/* Backdrop */}
            {movie.backdrop_path && (
              <div className="relative h-52 sm:h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={`${IMG_ORIGINAL}${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1526] via-[#0D1526]/40 to-transparent" />
              </div>
            )}

            <div className="p-5 -mt-10 relative">
              <div className="flex gap-4">
                {/* Poster */}
                {movie.poster_path && (
                  <img
                    src={`${IMG}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-24 sm:w-32 flex-shrink-0 rounded-xl shadow-lg object-cover"
                    style={{ aspectRatio: "2/3" }}
                  />
                )}

                <div className="flex-1 min-w-0 pt-8">
                  <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight">{movie.title}</h2>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                    {movie.vote_average > 0 && (
                      <span className="text-yellow-400 font-semibold">⭐ {movie.vote_average.toFixed(1)}</span>
                    )}
                    {year && <span className="text-slate-400">{year}</span>}
                    {runtime > 0 && <span className="text-slate-400">{runtime} min</span>}
                  </div>

                  {/* Gêneros */}
                  {genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {genres.map((g) => (
                        <span
                          key={g.id}
                          className="px-3 py-1 rounded-full text-xs text-[#60A5FA] border border-[#1D4ED8]/40 bg-[#1D4ED8]/10"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Botão trailer */}
                  {trailer && (
                    <a
                      href={`https://youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold rounded-xl transition-all shadow-glow"
                    >
                      ▶ Ver Trailer
                    </a>
                  )}
                </div>
              </div>

              {/* Sinopse */}
              {movie.overview && (
                <div className="mt-5">
                  <h3 className="text-white font-semibold mb-2">Sinopse</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{movie.overview}</p>
                </div>
              )}

              {/* Elenco */}
              {cast.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-white font-semibold mb-3">Elenco</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                    {cast.map((actor) => (
                      <div key={actor.id} className="flex-shrink-0 w-16 text-center">
                        <div className="w-14 h-14 mx-auto rounded-full overflow-hidden bg-[#0F1C35] border border-[#1D4ED8]/20">
                          {actor.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                              alt={actor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600 text-xl">👤</div>
                          )}
                        </div>
                        <p className="text-slate-400 text-xs mt-1 leading-tight line-clamp-2">{actor.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
