import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import Footer from "../components/Footer";
import MovieModal from "../components/MovieModal";

// IDs de gênero oficiais do TMDB
const ROWS = [
  { title: "Em Alta Esta Semana", genreId: null, trending: true },
  { title: "Ação & Adrenalina",   genreId: 28   },
  { title: "Terror & Horror",     genreId: 27   },
  { title: "Suspense & Thriller", genreId: 53   },
  { title: "Policial & Crime",    genreId: 80   },
  { title: "Ficção Científica",   genreId: 878  },
  { title: "Animações",           genreId: 16   },
  { title: "Comédia",             genreId: 35   },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen bg-[#060B18]">
      <Navbar />
      <HeroBanner />
      <div className="space-y-10 py-8">
        {ROWS.map((row) => (
          <MovieRow key={row.title} {...row} onMovieClick={setSelectedId} />
        ))}
      </div>
      <Footer />
      {selectedId && <MovieModal movieId={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
