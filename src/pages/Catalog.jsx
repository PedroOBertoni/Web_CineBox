import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import MovieModal from "../components/MovieModal";
import { fetchByGenre, fetchPopular, searchMovies } from "../api/tmdb";

const GENRES = [
  { id: null,  label: "Populares" },
  { id: 28,    label: "Ação" },
  { id: 27,    label: "Terror" },
  { id: 53,    label: "Suspense" },
  { id: 80,    label: "Crime" },
  { id: 878,   label: "Ficção Científica" },
  { id: 35,    label: "Comédia" },
  { id: 18,    label: "Drama" },
  { id: 16,    label: "Animação" },
  { id: 10749, label: "Romance" },
  { id: 12,    label: "Aventura" },
  { id: 14,    label: "Fantasia" },
];

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 glass rounded-xl text-sm text-slate-300 hover:text-white hover:bg-[#1D4ED8]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        ← Anterior
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onChange(1)} className="w-9 h-9 glass rounded-xl text-sm text-slate-400 hover:text-white hover:bg-[#1D4ED8]/30 transition-all">1</button>
          {start > 2 && <span className="text-slate-600">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
            p === page
              ? "bg-[#1D4ED8] text-white shadow-glow"
              : "glass text-slate-400 hover:text-white hover:bg-[#1D4ED8]/30"
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-slate-600">…</span>}
          <button onClick={() => onChange(totalPages)} className="w-9 h-9 glass rounded-xl text-sm text-slate-400 hover:text-white hover:bg-[#1D4ED8]/30 transition-all">{totalPages}</button>
        </>
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 glass rounded-xl text-sm text-slate-300 hover:text-white hover:bg-[#1D4ED8]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Próxima →
      </button>
    </div>
  );
}

export default function Catalog() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeGenre, setActiveGenre] = useState(GENRES[0]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [searchPages, setSearchPages] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (isSearching) return;
    setLoading(true);
    const fetch = activeGenre.id
      ? fetchByGenre(activeGenre.id, page)
      : fetchPopular(page);
    fetch
      .then(({ movies, totalPages }) => { setMovies(movies); setTotalPages(totalPages); })
      .finally(() => setLoading(false));
  }, [activeGenre, page, isSearching]);

  // Busca paginada
  useEffect(() => {
    if (!isSearching || !searchQuery) return;
    setLoading(true);
    searchMovies(searchQuery, searchPage)
      .then(({ movies, totalPages }) => { setSearchResults(movies); setSearchPages(totalPages); })
      .finally(() => setLoading(false));
  }, [searchQuery, searchPage, isSearching]);

  const handleSearchResults = (results, pages) => {
    setSearchResults(results);
    setSearchPages(pages);
    setSearchPage(1);
  };

  const handleSearching = (active, query = "") => {
    setIsSearching(active);
    if (query) setSearchQuery(query);
    if (!active) { setSearchResults([]); setSearchPage(1); setSearchQuery(""); }
  };

  const handleGenreChange = (genre) => {
    setActiveGenre(genre);
    setPage(1);
  };

  const handlePageChange = (p) => {
    if (isSearching) setSearchPage(p);
    else setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayed = isSearching ? searchResults : movies;
  const currentPage = isSearching ? searchPage : page;
  const currentTotal = isSearching ? searchPages : totalPages;

  return (
    <div className="min-h-screen bg-[#060B18]">
      <Navbar />

      <div className="pt-28 pb-8 px-8 md:px-12" style={{ background: "linear-gradient(to bottom, #0D1526, #060B18)" }}>
        <SearchBar
          onResults={handleSearchResults}
          onSearching={handleSearching}
        />
      </div>

      {!isSearching && (
        <div className="px-8 md:px-12 mb-8">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {GENRES.map((g) => (
              <button
                key={g.label}
                onClick={() => handleGenreChange(g)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeGenre.label === g.label
                    ? "bg-[#1D4ED8] text-white shadow-glow"
                    : "glass text-slate-300 hover:text-white"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-8 md:px-12 pb-12">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#1D4ED8] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && displayed.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-4xl mb-3">🔍</p>
            <p>Nenhum resultado encontrado</p>
          </div>
        )}

        {!loading && displayed.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {displayed.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClick={setSelectedId} />
              ))}
            </div>
            <Pagination page={currentPage} totalPages={currentTotal} onChange={handlePageChange} />
          </>
        )}
      </div>

      <Footer />
      {selectedId && <MovieModal movieId={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
