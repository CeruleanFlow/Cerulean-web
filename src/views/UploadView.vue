<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import { uploadPaper } from '@/api/papers'

const router = useRouter()
const file = ref<File | null>(null)
const loading = ref(false)
const error = ref('')
const isDialogOpen = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  file.value = target.files?.[0] ?? null
}

function openDialog() {
  error.value = ''
  isDialogOpen.value = true
}

function closeDialog() {
  if (loading.value) return
  isDialogOpen.value = false
}

function browseFiles() {
  fileInput.value?.click()
}

function onDrop(event: DragEvent) {
  const dropped = event.dataTransfer?.files?.[0]
  if (dropped) file.value = dropped
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
  <section class="upload-panel">
    <div>
      <h3>Bring a paper into Cerulean</h3>
      <p>Start with a PDF, then parse, chunk, index, search, and chat from the paper detail page.</p>
    </div>
    <button class="button primary upload-open-button" @click="openDialog">Choose PDF</button>
    <p v-if="file" class="selected-file">Ready: {{ file.name }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </section>

  <Teleport to="body">
    <div v-if="isDialogOpen" class="modal-backdrop" @click.self="closeDialog">
      <section class="upload-dialog" role="dialog" aria-modal="true" aria-labelledby="upload-title">
        <div class="dialog-header">
          <div>
            <h3 id="upload-title">Upload PDF</h3>
            <p>Select a research paper to add it to your library.</p>
          </div>
          <button class="icon-button" type="button" aria-label="Close upload dialog" @click="closeDialog">x</button>
        </div>

        <button class="dropzone" type="button" @click="browseFiles" @dragover.prevent @drop.prevent="onDrop">
          <span class="dropzone-mark">PDF</span>
          <strong>{{ file ? file.name : 'Drop a PDF here or click to browse' }}</strong>
          <small v-if="file">{{ (file.size / 1024).toFixed(1) }} KB selected</small>
          <small v-else>Only PDF files are accepted.</small>
        </button>

        <input
          ref="fileInput"
          class="sr-only"
          type="file"
          accept="application/pdf,.pdf"
          @change="onFileChange"
        />

        <div class="dialog-actions">
          <button class="button" type="button" :disabled="loading" @click="closeDialog">Cancel</button>
          <button class="button primary" type="button" :disabled="!file || loading" @click="submit">
            {{ loading ? 'Uploading...' : 'Upload Paper' }}
          </button>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
      </section>
    </div>
  </Teleport>
</template>
