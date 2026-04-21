import { useEffect, useRef, useState } from "react";
import { fetchByGenre, fetchTrending } from "../api/tmdb";
import MovieCard from "./MovieCard";

const CARD_WIDTH = 164;

export default function MovieRow({ title, genreId, trending, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (trending) {
      fetchTrending().then(setMovies);
    } else {
      fetchByGenre(genreId).then(({ movies }) => setMovies(movies));
    }
  }, [genreId, trending]);

  // Calcula o offset máximo após os filmes carregarem
  useEffect(() => {
    if (!trackRef.current || !wrapperRef.current || movies.length === 0) return;
    const trackW = trackRef.current.scrollWidth;
    const wrapperW = wrapperRef.current.offsetWidth;
    setMaxOffset(Math.max(0, trackW - wrapperW));
    setOffset(0);
  }, [movies]);

  const scroll = (dir) => {
    setOffset((prev) => {
      const next = prev + dir * CARD_WIDTH * 4;
      return Math.max(0, Math.min(next, maxOffset));
    });
  };

  if (movies.length === 0) return null;

  const canLeft = offset > 0;
  const canRight = offset < maxOffset;

  return (
    <div className="px-6 md:px-12 group/row">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg md:text-xl font-bold text-white">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#1D4ED8]/30 to-transparent ml-2" />
      </div>

      <div className="relative">
        {/* Botão esquerda */}
        {canLeft && (
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-[#1D4ED8]/30 transition-all shadow-glow text-xl"
          >‹</button>
        )}

        {/* Wrapper — overflow-x hidden corta o track, overflow-y visible preserva o scale */}
        <div
          ref={wrapperRef}
          style={{ overflowX: "clip", overflowY: "visible", paddingTop: "6px", marginTop: "-6px" }}
        >
          <div
            ref={trackRef}
            className="flex gap-3 pb-2 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="w-[150px] md:w-[160px] flex-shrink-0">
                <MovieCard movie={movie} onClick={onMovieClick} />
              </div>
            ))}
          </div>
        </div>

        {/* Botão direita */}
        {canRight && (
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-[#1D4ED8]/30 transition-all shadow-glow text-xl"
          >›</button>
        )}

        {/* Fade lateral direita */}
        {canRight && (
          <div className="absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-[#060B18] to-transparent pointer-events-none z-10" />
        )}
      </div>
    </div>
  );
}
