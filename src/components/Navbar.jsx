import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Início" },
    { to: "/catalogo", label: "Catálogo" },
    { to: "/planos", label: "Planos" },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(13, 21, 38, 0.85)" : "linear-gradient(to bottom, #060B18, transparent)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(59, 130, 246, 0.12)" : "transparent"}`,
        boxShadow: scrolled ? "0 0 20px rgba(59, 130, 246, 0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all">
            <span className="text-white font-black text-sm">CB</span>
          </div>
          <span className="text-xl font-black text-gradient">CineBox</span>
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition-all duration-200 hover:text-primary-glow relative group ${
                location.pathname === to ? "text-primary-glow" : "text-slate-300"
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary-light transition-all duration-300 ${
                  location.pathname === to ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">
                Olá, <span className="text-primary-glow font-medium">{user.name || user.email.split("@")[0]}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:border-primary-light hover:text-primary-glow transition-all"
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-all"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="text-sm px-5 py-2 rounded-lg bg-primary hover:bg-primary-dark font-semibold shadow-glow hover:shadow-glow-lg transition-all"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-blue-900/30 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="text-slate-300 hover:text-primary-glow transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 border-t border-blue-900/30">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Olá, <span className="text-primary-glow font-medium">{user.name || user.email.split("@")[0]}</span></span>
                <button onClick={handleLogout} className="text-sm text-slate-400 hover:text-white">
                  Sair
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">Entrar</Link>
                <Link to="/cadastro" onClick={() => setMenuOpen(false)} className="text-sm px-4 py-1.5 bg-primary rounded-lg font-semibold">Cadastrar</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
