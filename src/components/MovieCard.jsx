import { IMG } from "../api/tmdb";

export default function MovieCard({ movie, onClick }) {
  // Não renderiza se não tiver poster
  if (!movie?.poster_path) return null;

  const title = movie.title || movie.name || "";
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <div className="relative group cursor-pointer" onClick={() => onClick?.(movie.id)}>
      <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">
        <img
          src={`${IMG}${movie.poster_path}`}
          alt={title}
          className="w-full aspect-[2/3] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white text-xs font-semibold line-clamp-2 leading-tight">{title}</p>
          <div className="flex items-center justify-between mt-1">
            {year && <span className="text-slate-400 text-xs">{year}</span>}
            {rating && <span className="text-yellow-400 text-xs font-bold">⭐ {rating}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
