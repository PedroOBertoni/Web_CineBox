# 🎬 CineBox

> Trabalho acadêmico desenvolvido para a disciplina de **Desenvolvimento Web** do curso de **Análise e Desenvolvimento de Sistemas** da **Uni-FACEF — Centro Universitário Municipal de Franca**.

---

## 📋 Sobre o Projeto

O **CineBox** é uma plataforma de streaming de filmes inspirada em serviços como Netflix, desenvolvida inteiramente como aplicação **Front-End Only**. O projeto simula uma experiência completa de plataforma de entretenimento, com catálogo de filmes em tempo real, sistema de busca, filtros por gênero, planos de assinatura e autenticação local — tudo sem nenhum back-end ou banco de dados externo.

O objetivo acadêmico foi aplicar na prática os conceitos de desenvolvimento web moderno, incluindo componentização com React, consumo de APIs REST, gerenciamento de estado, roteamento client-side e estilização responsiva com Tailwind CSS.

---

## ✨ Funcionalidades

### 🏠 Página Inicial (Home)
- Banner hero com rotação automática entre os filmes mais populares da semana, com transição suave e indicadores clicáveis
- Múltiplas seções de filmes organizadas por gênero: **Em Alta, Ação, Terror, Suspense, Policial, Ficção Científica, Animações e Comédia**
- Carrosséis horizontais com navegação por botões, sem interferir no scroll vertical da página
- Efeito de hover nos cards com escala, overlay e exibição de título e avaliação

### 🎬 Catálogo
- Exibição de filmes populares como padrão ao entrar na página
- **Filtros por gênero** em formato de pills clicáveis: Populares, Ação, Terror, Suspense, Crime, Ficção Científica, Comédia, Drama, Animação, Romance, Aventura e Fantasia
- **Busca em tempo real** com debounce de 400ms para evitar requisições desnecessárias
- **Paginação completa** com navegação por números, botões anterior/próxima e reticências para ranges grandes — tanto para filtros quanto para resultados de busca
- Todos os filmes exibidos possuem poster e backdrop garantidos (filtragem na camada de API)

### 💳 Planos de Assinatura
- Três planos: **Básico (R$ 19,90)**, **Intermediário (R$ 29,90)** e **Avançado (R$ 49,90)**
- Cards interativos com borda e glow colorido ao hover, efeito shimmer no botão
- Badges de destaque: "Mais Popular" (azul) e "Premium" (âmbar), ambos com fundo sólido e glow
- Ícones SVG únicos por plano que reagem ao hover
- Seção **"Por que confiar no CineBox"** com 4 cards detalhados: Pagamento Seguro, Cancelamento, Sem Fidelidade e Suporte em Português
- Ao clicar em "Começar agora", redireciona automaticamente para a página de cadastro

### 🔐 Autenticação (Demonstração Local)
- **Cadastro** com campos de nome, e-mail, senha e seleção de plano via cards clicáveis
- **Login** com validação real de credenciais contra os dados cadastrados na sessão
- Dados armazenados em `sessionStorage` — existem apenas durante a sessão do navegador e são perdidos ao recarregar ou fechar a aba
- Aviso visual claro em ambas as telas informando o caráter demonstrativo
- Após login, a navbar exibe "Olá, [Nome do usuário]" com botão de sair
- Validações: campos obrigatórios, senha mínima de 6 caracteres, e-mail duplicado na mesma sessão

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [React](https://react.dev/) | 18.3 | Biblioteca principal de UI com componentes funcionais e hooks |
| [Vite](https://vitejs.dev/) | 5.2 | Bundler e servidor de desenvolvimento |
| [Tailwind CSS](https://tailwindcss.com/) | 4.0 | Estilização utilitária com tema customizado via `@theme` |
| [React Router DOM](https://reactrouter.com/) | 6.23 | Roteamento client-side com BrowserRouter |
| [TMDB API](https://www.themoviedb.org/documentation/api) | v3 | Fonte de dados de filmes em tempo real |

---

## 🌐 API Externa — TMDB

O projeto consome a **The Movie Database API (TMDB)**, uma API pública e gratuita com um dos maiores bancos de dados de filmes e séries do mundo.

### Endpoints utilizados

| Endpoint | Descrição |
|---|---|
| `GET /trending/movie/week` | Filmes em alta na semana (Hero Banner e seção Em Alta) |
| `GET /discover/movie` | Filmes filtrados por gênero com ordenação por popularidade |
| `GET /movie/popular` | Filmes populares gerais (padrão do catálogo) |
| `GET /search/movie` | Busca de filmes por título |
| `GET /movie/{id}` | Detalhes completos de um filme específico |

### Parâmetros aplicados em todas as requisições
- `language=pt-BR` — títulos e sinopses em português brasileiro
- `vote_count.gte=200` — garante que apenas filmes conhecidos apareçam
- Filtragem client-side: filmes sem `poster_path` ou `backdrop_path` são descartados automaticamente

---

## 🗂️ Estrutura do Projeto

```
projeto_cinebox/
├── public/
│   └── assets/
├── src/
│   ├── api/
│   │   └── tmdb.js              # Camada de integração com a TMDB API
│   ├── components/
│   │   ├── Footer.jsx           # Rodapé com links, categorias e créditos
│   │   ├── HeroBanner.jsx       # Banner principal com rotação automática
│   │   ├── MovieCard.jsx        # Card individual de filme com hover
│   │   ├── MovieRow.jsx         # Carrossel horizontal de filmes por seção
│   │   ├── Navbar.jsx           # Barra de navegação fixa com glassmorphism
│   │   └── SearchBar.jsx        # Campo de busca com debounce
│   ├── context/
│   │   └── AuthContext.jsx      # Contexto global de autenticação (sessionStorage)
│   ├── pages/
│   │   ├── Catalog.jsx          # Página de catálogo com filtros e paginação
│   │   ├── Home.jsx             # Página inicial com seções por gênero
│   │   ├── Login.jsx            # Tela de login com validação
│   │   ├── Plans.jsx            # Página de planos de assinatura
│   │   └── Register.jsx         # Tela de cadastro com seletor de plano
│   ├── App.jsx                  # Roteamento principal e providers
│   ├── index.css                # Estilos globais, tema Tailwind e autofill fix
│   └── main.jsx                 # Ponto de entrada da aplicação
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎨 Design System

### Paleta de Cores

| Papel | Cor | Hex |
|---|---|---|
| Primária | Azul principal | `#1D4ED8` |
| Primária hover | Azul escuro | `#1E40AF` |
| Destaque / Glow | Azul claro | `#60A5FA` |
| Fundo principal | Azul quase preto | `#060B18` |
| Fundo secundário | Azul escuro | `#0D1526` |
| Cards / Painéis | Azul médio escuro | `#0F1C35` |
| Inputs | Cinza azulado | `#111827` |
| Premium / Âmbar | Laranja escuro | `#B45309` |
| Texto principal | Branco suave | `#E2E8F0` |

### Componentes Visuais
- **Glassmorphism** — navbar ao rolar, cards de aviso e botões secundários com `backdrop-filter: blur`
- **Gradiente de texto** — logotipo e títulos de destaque com `background-clip: text`
- **Glow effects** — `box-shadow` colorido em botões, cards ativos e logo
- **Carrossel por transform** — scroll horizontal via `translateX` sem `overflow-x: auto`, evitando captura do scroll vertical da página
- **Autofill fix** — `-webkit-box-shadow` inset para manter o background escuro nos inputs preenchidos automaticamente pelo browser

### Tipografia
- **Inter** (Google Fonts) — pesos 300 a 900

---

## 🚀 Como Executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (incluso com o Node.js)

### Instalação e execução

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/projeto_cinebox.git

# Acesse a pasta do projeto
cd projeto_cinebox

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador.

### Scripts disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento com hot reload
npm run build    # Gera o build de produção na pasta /dist
npm run preview  # Visualiza o build de produção localmente
```

---

## 📄 Observações Acadêmicas

- O sistema de autenticação é **exclusivamente para demonstração** — nenhum dado é enviado a servidores externos. As credenciais existem apenas na `sessionStorage` do navegador durante a sessão ativa.
- A chave da TMDB utilizada é de uso público para fins acadêmicos e de demonstração.
- O projeto é **100% Front-End**, sem back-end, banco de dados ou qualquer servidor próprio.

---

## 👨‍🎓 Informações Acadêmicas

| | |
|---|---|
| **Instituição** | Uni-FACEF — Centro Universitário Municipal de Franca |
| **Curso** | Análise e Desenvolvimento de Sistemas |
| **Disciplina** | Desenvolvimento Web |
| **Ano** | 2025 |

---

<p align="center">
  Desenvolvido com dedicação para a <strong>Uni-FACEF</strong> · Franca, SP
</p>
