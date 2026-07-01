<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import { getPaper, ingestPaper } from '@/api/papers'
import type { Paper } from '@/types/api'

const props = defineProps<{ id: string }>()
const paper = ref<Paper | null>(null)
const loading = ref(false)
const error = ref('')
const taskMessage = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    paper.value = await getPaper(props.id)
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

async function startIngest() {
  if (!paper.value) return
  const task = await ingestPaper(paper.value.id)
  taskMessage.value = `Task created: ${task.id}`
  await load()
}

onMounted(load)
</script>

<template>
  <PageHeader title="Paper Detail" description="View metadata and trigger parsing/indexing." />
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
    </dl>

    <div class="toolbar">
      <button class="button primary" @click="startIngest">Start Ingest</button>
      <RouterLink class="button" :to="`/search?paper_id=${paper.id}`">Search this paper</RouterLink>
      <RouterLink class="button" :to="`/chat?paper_id=${paper.id}`">Ask about this paper</RouterLink>
    </div>
    <p v-if="taskMessage" class="success">{{ taskMessage }}</p>
  </section>
</template>
