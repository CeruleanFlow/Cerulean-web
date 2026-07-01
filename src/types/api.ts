export type PaperStatus = 'uploaded' | 'processing' | 'parsed' | 'indexed' | 'failed'

export interface Paper {
  id: string
  title: string
  filename: string
  content_type: string
  size: number
  sha256: string
  object_key: string
  status: PaperStatus
  page_count: number
  created_at: string
  updated_at: string
}

export interface PaperListResponse {
  items: Paper[]
}

export interface SearchRequest {
  query: string
  top_k?: number
  filters?: Record<string, string>
}

export interface Source {
  chunk_id: string
  paper_id: string
  page_no: number
  text: string
  score: number
}

export interface SearchResponse {
  query: string
  results: Source[]
}

export interface ChatRequest {
  question: string
  top_k?: number
  filters?: Record<string, string>
}

export interface ChatResponse {
  answer: string
  sources: Source[]
}
