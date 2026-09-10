<script setup lang="ts">
import { onMounted } from 'vue';
import { useBloodPressure } from '@/composables/useBloodPressure';

const { entries, latest, isLoading, error, fetchAll, fetchLatest, createEntry } = useBloodPressure();

onMounted(() => {
  fetchAll();
  fetchLatest();
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <p v-if="isLoading">Chargement...</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="latest">Dernière mesure : {{ latest.date }}</div>
    <ul>
      <li v-for="entry in entries" :key="entry.id">{{ entry.date }}</li>
    </ul>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
