export type PaperStatus = 'uploaded' | 'processing' | 'parsed' | 'indexed' | 'failed'
export type TaskStatus = 'queued' | 'running' | 'succeeded' | 'failed'

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
  error?: string
  created_at: string
  updated_at: string
}

export interface PaperListResponse {
  items: Paper[]
}

export interface Chunk {
  id: string
  paper_id: string
  page_no: number
  index: number
  text: string
  object_key?: string
  vector_id?: string
  metadata?: Record<string, string>
  created_at: string
  updated_at: string
}

export interface ChunkListResponse {
  items: Chunk[]
}

export interface Task {
  id: string
  paper_id: string
  type: string
  status: TaskStatus
  message?: string
  created_at: string
  updated_at: string
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
  backend?: string
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
