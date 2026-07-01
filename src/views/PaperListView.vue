<script setup lang="ts">
import { onMounted } from 'vue'
import { usePaperStore } from '@/stores/papers'
import PageHeader from '@/components/PageHeader.vue'
import StatusBadge from '@/components/StatusBadge.vue'

const store = usePaperStore()
onMounted(() => store.refresh())
</script>

<template>
  <PageHeader title="Papers" description="Manage uploaded papers and their ingestion status." />
  <div class="toolbar">
    <RouterLink class="button primary" to="/upload">Upload Paper</RouterLink>
    <button class="button" @click="store.refresh">Refresh</button>
  </div>

  <p v-if="store.loading">Loading papers...</p>
  <p v-if="store.error" class="error">{{ store.error }}</p>

  <div class="paper-list">
    <RouterLink v-for="paper in store.items" :key="paper.id" :to="`/papers/${paper.id}`" class="paper-row">
      <div>
        <h3>{{ paper.title }}</h3>
        <p>{{ paper.filename }} · {{ (paper.size / 1024).toFixed(1) }} KB</p>
      </div>
      <StatusBadge :status="paper.status" />
    </RouterLink>
  </div>
</template>
