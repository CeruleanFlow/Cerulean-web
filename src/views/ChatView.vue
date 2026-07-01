<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import SourceList from '@/components/SourceList.vue'
import { chatWithPapers } from '@/api/search'
import type { Source } from '@/types/api'

const route = useRoute()
const question = ref('')
const answer = ref('')
const sources = ref<Source[]>([])
const loading = ref(false)
const error = ref('')

async function ask() {
  loading.value = true
  error.value = ''
  try {
    const filters: Record<string, string> = {}
    if (route.query.paper_id) filters.paper_id = String(route.query.paper_id)
    const resp = await chatWithPapers({ question: question.value, top_k: 5, filters })
    answer.value = resp.answer
    sources.value = resp.sources
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <PageHeader title="RAG Reading Assistant" description="Ask paper-aware questions and verify answers with sources." />
  <section class="card query-card">
    <textarea v-model="question" placeholder="Ask: Explain the motivation, method, experiments, or limitations." />
    <button class="button primary" :disabled="!question || loading" @click="ask">
      {{ loading ? 'Thinking...' : 'Ask' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
  <section v-if="answer" class="card answer-card">
    <h3>Answer</h3>
    <p>{{ answer }}</p>
  </section>
  <SourceList :sources="sources" />
</template>
