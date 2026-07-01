<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import SourceList from '@/components/SourceList.vue'
import { searchPapers } from '@/api/search'
import type { Source } from '@/types/api'

const route = useRoute()
const query = ref('')
const topK = ref(5)
const loading = ref(false)
const error = ref('')
const results = ref<Source[]>([])

async function submit() {
  loading.value = true
  error.value = ''
  try {
    const filters: Record<string, string> = {}
    if (route.query.paper_id) filters.paper_id = String(route.query.paper_id)
    const resp = await searchPapers({ query: query.value, top_k: topK.value, filters })
    results.value = resp.results
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <PageHeader title="Hybrid Search" description="Search paper chunks through Elasticsearch + Amaranth fusion." />
  <section class="card query-card">
    <textarea v-model="query" placeholder="Search papers, e.g. What is the main contribution?" />
    <div class="toolbar">
      <label>TopK <input v-model.number="topK" type="number" min="1" max="20" /></label>
      <button class="button primary" :disabled="!query || loading" @click="submit">
        {{ loading ? 'Searching...' : 'Search' }}
      </button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
  <SourceList :sources="results" />
</template>
