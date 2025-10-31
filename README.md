# CineList

Aplicação React para explorar filmes usando a API do The Movie Database (TMDB), favoritar títulos e descobrir novos conteúdos.

## 🌐 Deploy

Aplicação disponível em: [https://cinelist.franciscobressa.dev/](https://cinelist.franciscobressa.dev/)

## 🚀 Tecnologias

- React 18 + TypeScript
- Vite
- React Router DOM 7
- Context API
- Axios
- Jest + React Testing Library
- Tailwind CSS (via classes utilitárias)

## 📦 Pré-requisitos

- Node.js 18+
- Conta e token da API TMDB (Bearer Token v4)

## 🔧 Configuração

1. Clone o repositório:

```bash
git clone https://github.com/franciscobressa/cinelist.git
cd cinelist
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env-example .env
# edite o arquivo .env e informe seu VITE_TMDB_TOKEN
```

4. Execute em modo desenvolvimento:

```bash
npm run dev
```

5. Build de produção:

```bash
npm run build
npm run preview
```

6. Testes unitários:

```bash
npm run test
```

## 📱 Funcionalidades

- **Home**: filmes populares com scroll infinito, destaque de favoritos e nota TMDB.
- **Detalhes**: informações completas do filme com poster/backdrop, gêneros, sinopse e botão de favoritar.
- **Favoritos**: grid dos filmes salvos, ordenação por título e nota, estado vazio amigável.
- **Busca**: pesquisa global integrada ao header, com realce do termo nos resultados e carregamento paginado.

## 🛠️ Estrutura

- `src/context/AppContext.tsx`: estado global (favoritos, busca, populares).
- `src/services/moviesService.ts`: consumo da API TMDB.
- `src/hooks/`: hooks customizados (`useLocalStorage`, `useDebounce`, `useAsync`).
- `src/components/`: componentes compartilhados e específicos.
- `src/pages/`: Home, Favorties, Search e MovieDetailsPage.
- `src/tests/`: cobertura ampla com Jest/RTL.

## 🧪 Cobertura de Testes

- Hooks customizados
- Providers (Toast, AppContext)
- Componentes principais (cards, header, listas, modais)
- Utilitários (`formatDate`)

## 🧩 Variáveis de ambiente

| Chave             | Descrição                        |
| ----------------- | -------------------------------- |
| `VITE_TMDB_TOKEN` | Bearer token (v4) da API do TMDB |

`VITE_TMDB_BASE_URL` já está definido no `.env-example` como `https://api.themoviedb.org/3`.

## 📄 Licença

Este projeto foi desenvolvido para fins de avaliação técnica.
