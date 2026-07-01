<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
</script>

<template>
  <PageHeader
    title="Cerulean Overview"
    description="A paper-oriented RAG system for graduate students and research reading."
  />

  <section class="grid two">
    <div class="card">
      <h3>Document Artifacts</h3>
      <p>Original PDFs, OCR JSON, page images, tables, and figures will be stored in MinIO.</p>
    </div>
    <div class="card">
      <h3>Hybrid Retrieval</h3>
      <p>Elasticsearch handles BM25 keyword retrieval while Amaranth handles vector retrieval.</p>
    </div>
    <div class="card">
      <h3>Reading Assistant</h3>
      <p>Ask questions about papers and get page-aware sources for verification.</p>
    </div>
    <div class="card">
      <h3>Research Workflow</h3>
      <p>Designed for paper upload, parsing, chunking, indexing, retrieval, and RAG explanation.</p>
    </div>
  </section>
</template>
