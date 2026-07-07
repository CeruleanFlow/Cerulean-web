<script setup lang="ts">
import logoUrl from '@/assets/Cerulean.png'

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/papers', label: 'Papers' },
  { to: '/upload', label: 'Upload' },
  { to: '/search', label: 'Search' },
  { to: '/chat', label: 'RAG Chat' }
]
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">
          <img :src="logoUrl" alt="Cerulean logo" />
        </div>
        <div>
          <h1>Cerulean</h1>
          <p>Paper RAG</p>
        </div>
      </div>
      <nav class="nav-list">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-link">
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>
    <main class="main-panel">
      <RouterView />
    </main>
  </div>
</template>
