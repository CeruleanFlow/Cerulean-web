<script setup lang="ts">
import type { PaperStatus } from '@/types/api'

defineProps<{ status: PaperStatus }>()
</script>

<template>
  <span class="status-badge" :class="`status-${status}`">{{ status }}</span>
</template>
