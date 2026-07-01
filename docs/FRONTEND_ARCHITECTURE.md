# Cerulean Web Architecture

The frontend is a Vue 3 + Vite + TypeScript project.

## Responsibilities

- Upload papers.
- Display paper processing status.
- Trigger ingestion.
- Search chunks through the backend.
- Ask RAG questions and render sources.
- Later: PDF page preview and bbox highlight.

## API Boundary

The frontend only calls `/api/v1/*`. It should not know whether the backend uses MinIO, Elasticsearch, Amaranth, or PaddleOCR internally.

## Suggested Future Components

- `PdfPreview.vue`
- `PageHighlighter.vue`
- `ChunkViewer.vue`
- `CitationPanel.vue`
- `IngestTimeline.vue`
- `ModelSelector.vue`
