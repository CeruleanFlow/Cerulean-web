# Cerulean Web

Vue 3 frontend for Cerulean, a paper-oriented RAG system for academic reading.

## Features in the Skeleton

- Dashboard layout
- Paper upload page
- Paper list and detail pages
- Search page
- RAG chat page
- API client wrappers for the Go backend
- Pinia store for paper state

## Run

```bash
npm install
npm run dev
```

By default, Vite proxies `/api` to `http://localhost:8080`.

## Pages

| Route | Page |
|---|---|
| `/` | Dashboard |
| `/papers` | Paper list |
| `/upload` | Upload paper |
| `/papers/:id` | Paper detail |
| `/search` | Hybrid retrieval |
| `/chat` | RAG reading assistant |
