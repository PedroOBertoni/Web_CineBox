import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const PLANS = [
  { value: "basico", label: "Básico", price: "R$ 19,90/mês", desc: "HD · 1 tela" },
  { value: "intermediario", label: "Intermediário", price: "R$ 29,90/mês", desc: "Full HD · 2 telas" },
  { value: "avancado", label: "Avançado", price: "R$ 49,90/mês", desc: "4K · 4 telas" },
];

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "", plan: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.plan)
      return setError("Preencha todos os campos.");
    if (form.password.length < 6)
      return setError("A senha deve ter pelo menos 6 caracteres.");
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = register(form.email, form.password, form.name);
    if (!result.ok) {
      setLoading(false);
      return setError(result.error);
    }
    navigate("/");
  };

  const fields = [
    { field: "name", label: "Nome completo", type: "text", placeholder: "Seu nome" },
    { field: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
    { field: "password", label: "Senha", type: "password", placeholder: "Mínimo 6 caracteres" },
  ];

  return (
    <div className="min-h-screen bg-[#060B18] relative overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(29,78,216,0.15) 0%, transparent 70%)" }} />

      <div className="flex items-center justify-center min-h-screen px-4 py-8 pt-24">
        <div className="w-full max-w-md relative z-10">

          {/* Aviso de sessão */}
          <div className="flex items-start gap-3 bg-[#0F1C35] border border-[#1D4ED8]/25 rounded-xl px-4 py-3 mb-6">
            <span className="text-[#60A5FA] mt-0.5 flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              <span className="text-slate-300 font-medium">Modo demonstração.</span> O cadastro é apenas local e temporário — seus dados existem somente durante esta sessão do navegador e são perdidos ao recarregar ou fechar a aba.
            </p>
          </div>

          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-1">Criar conta</h2>
            <p className="text-slate-500 text-sm mb-6">Válido apenas para esta sessão do navegador</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label className="text-slate-400 text-xs font-medium mb-1.5 block">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[field]}
                    onChange={set(field)}
                    className="w-full px-4 py-3 bg-[#111827] border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-[#1D4ED8] transition-all text-sm"
                  />
                </div>
              ))}

              <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">Plano escolhido</label>
                <div className="grid grid-cols-3 gap-2">
                  {PLANS.map((p) => {
                    const active = form.plan === p.value;
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, plan: p.value }))}
                        className="relative flex flex-col items-center text-center px-2 py-3 rounded-xl border transition-all duration-200"
                        style={{
                          background: active ? "rgba(29,78,216,0.15)" : "#111827",
                          borderColor: active ? "#1D4ED8" : "#334155",
                          boxShadow: active ? "0 0 12px rgba(29,78,216,0.3)" : "none",
                        }}
                      >
                        {active && (
                          <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#1D4ED8] rounded-full flex items-center justify-center">
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                              <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        )}
                        <span className={`text-xs font-semibold mb-0.5 ${active ? "text-white" : "text-slate-300"}`}>
                          {p.label}
                        </span>
                        <span className={`text-xs font-bold ${active ? "text-[#60A5FA]" : "text-slate-400"}`}>
                          {p.price}
                        </span>
                        <span className="text-slate-600 text-xs mt-0.5">{p.desc}</span>
                      </button>
                    );
                  })}
                </div>
                <Link to="/planos" className="text-[#60A5FA] text-xs mt-2 inline-block hover:underline">
                  Ver detalhes dos planos →
                </Link>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-xl font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{ boxShadow: "0 0 20px rgba(29,78,216,0.35)" }}
              >
                {loading ? "Criando conta..." : "Criar conta"}
              </button>
            </form>

            <p className="text-center text-slate-500 text-sm mt-6">
              Já tem conta?{" "}
              <Link to="/login" className="text-[#60A5FA] hover:text-[#3B82F6] font-medium transition-colors">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
