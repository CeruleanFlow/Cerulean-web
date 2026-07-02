<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import { getPaper, ingestPaper, listPaperChunks, paperDownloadUrl } from '@/api/papers'
import type { Chunk, Paper } from '@/types/api'

const props = defineProps<{ id: string }>()
const paper = ref<Paper | null>(null)
const chunks = ref<Chunk[]>([])
const loading = ref(false)
const ingesting = ref(false)
const error = ref('')
const taskMessage = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    paper.value = await getPaper(props.id)
    chunks.value = await listPaperChunks(props.id)
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

async function startIngest() {
  if (!paper.value) return
  ingesting.value = true
  taskMessage.value = ''
  try {
    const task = await ingestPaper(paper.value.id)
    taskMessage.value = `Task created: ${task.id} (${task.status})`
    window.setTimeout(load, 500)
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    ingesting.value = false
  }
}

onMounted(load)
</script>

<template>
  <PageHeader title="Paper Detail" description="View metadata, download artifacts, and trigger parsing/indexing." />
  <p v-if="loading">Loading...</p>
  <p v-if="error" class="error">{{ error }}</p>

  <section v-if="paper" class="card detail-card">
    <div class="detail-title">
      <div>
        <h3>{{ paper.title }}</h3>
        <p>{{ paper.filename }}</p>
      </div>
      <StatusBadge :status="paper.status" />
    </div>

    <dl class="meta-grid">
      <dt>ID</dt><dd>{{ paper.id }}</dd>
      <dt>Object Key</dt><dd>{{ paper.object_key }}</dd>
      <dt>SHA256</dt><dd>{{ paper.sha256 }}</dd>
      <dt>Size</dt><dd>{{ (paper.size / 1024).toFixed(1) }} KB</dd>
      <dt>Pages</dt><dd>{{ paper.page_count || '-' }}</dd>
      <dt>Updated</dt><dd>{{ new Date(paper.updated_at).toLocaleString() }}</dd>
      <dt v-if="paper.error">Error</dt><dd v-if="paper.error">{{ paper.error }}</dd>
    </dl>

    <div class="toolbar">
      <button class="button primary" :disabled="ingesting" @click="startIngest">
        {{ ingesting ? 'Starting...' : 'Start Ingest' }}
      </button>
      <a class="button" :href="paperDownloadUrl(paper.id)" target="_blank" rel="noreferrer">Open PDF</a>
      <RouterLink class="button" :to="`/search?paper_id=${paper.id}`">Search this paper</RouterLink>
      <RouterLink class="button" :to="`/chat?paper_id=${paper.id}`">Ask about this paper</RouterLink>
    </div>
    <p v-if="taskMessage" class="success">{{ taskMessage }}</p>
  </section>

  <section v-if="chunks.length" class="card">
    <h3>Generated Chunks</h3>
    <div class="source-list">
      <article v-for="chunk in chunks" :key="chunk.id" class="source-card">
        <div class="source-meta">
          <span>{{ chunk.id }}</span>
          <span>Page {{ chunk.page_no }}</span>
          <span>#{{ chunk.index }}</span>
        </div>
        <p>{{ chunk.text }}</p>
      </article>
    </div>
  </section>
</template>
