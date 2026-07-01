import { http } from './http'
import type { ChatRequest, ChatResponse, SearchRequest, SearchResponse } from '@/types/api'

export async function searchPapers(req: SearchRequest): Promise<SearchResponse> {
  const { data } = await http.post<SearchResponse>('/search', req)
  return data
}

export async function chatWithPapers(req: ChatRequest): Promise<ChatResponse> {
  const { data } = await http.post<ChatResponse>('/chat', req)
  return data
}
