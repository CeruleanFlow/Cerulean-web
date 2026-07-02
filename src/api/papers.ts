import { http } from './http'
import type { Chunk, ChunkListResponse, Paper, PaperListResponse, Task } from '@/types/api'

export async function uploadPaper(file: File): Promise<Paper> {
  const form = new FormData()
  form.append('file', file)
  const { data } = await http.post<Paper>('/papers', form)
  return data
}

export async function listPapers(): Promise<Paper[]> {
  const { data } = await http.get<PaperListResponse>('/papers')
  return data.items
}

export async function getPaper(id: string): Promise<Paper> {
  const { data } = await http.get<Paper>(`/papers/${id}`)
  return data
}

export async function listPaperChunks(id: string): Promise<Chunk[]> {
  const { data } = await http.get<ChunkListResponse>(`/papers/${id}/chunks`)
  return data.items
}

export async function ingestPaper(id: string): Promise<Task> {
  const { data } = await http.post<Task>(`/papers/${id}/ingest`)
  return data
}

export function paperDownloadUrl(id: string): string {
  const base = http.defaults.baseURL || '/api/v1'
  return `${base}/papers/${id}/download`
}
