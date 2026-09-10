<script setup lang="ts">
import { onMounted } from 'vue';
import { useBloodPressure } from '@/composables/useBloodPressure';
import LoaderLogo from "@/components/ui/elements/LoaderLogo.vue";
import Header from '@/components/ui/Header.vue';
import BloodPressure from '@/components/form/BloodPressure.vue';

const { entries, latest, isLoading, fetchAll, fetchLatest } = useBloodPressure();

onMounted(() => {
  fetchAll();
  fetchLatest();
});
</script>

<template>
  <LoaderLogo v-if="isLoading" />
  <Header :latest-blood-pressure="latest" />
  <main>
    <BloodPressure />
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
