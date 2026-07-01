<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import { uploadPaper } from '@/api/papers'

const router = useRouter()
const file = ref<File | null>(null)
const loading = ref(false)
const error = ref('')

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  file.value = target.files?.[0] ?? null
}

async function submit() {
  if (!file.value) return
  loading.value = true
  error.value = ''
  try {
    const paper = await uploadPaper(file.value)
    router.push(`/papers/${paper.id}`)
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <PageHeader title="Upload Paper" description="Upload a PDF and create an ingestion task." />
  <section class="card upload-card">
    <input type="file" accept="application/pdf,.pdf" @change="onFileChange" />
    <p v-if="file">Selected: {{ file.name }}</p>
    <button class="button primary" :disabled="!file || loading" @click="submit">
      {{ loading ? 'Uploading...' : 'Upload' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>
