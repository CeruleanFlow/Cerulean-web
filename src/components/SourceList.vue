<script setup lang="ts">
import type { Source } from '@/types/api'

defineProps<{ sources: Source[] }>()
</script>

<template>
  <div class="source-list">
    <article v-for="source in sources" :key="source.chunk_id" class="source-card">
      <div class="source-meta">
        <span>{{ source.paper_id }}</span>
        <span>Page {{ source.page_no }}</span>
        <span>Score {{ source.score.toFixed(4) }}</span>
      </div>
      <p>{{ source.text }}</p>
    </article>
  </div>
</template>
