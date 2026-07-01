import { http } from './http'
import type { Paper, PaperListResponse } from '@/types/api'

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

export async function ingestPaper(id: string) {
  const { data } = await http.post(`/papers/${id}/ingest`)
  return data
}
