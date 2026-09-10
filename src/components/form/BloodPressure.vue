<script setup lang="ts">
</script>

<template>
  <div class="blood-pressure-container">
    <div class="header">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14"></path>
        <path d="M12 5v14"></path>
      </svg>
      <span>Nouvelle saisie</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blood-pressure-container {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1),
  0 1px 2px -1px rgba(0, 0, 0, .1),
  0 0 0 1px oklch(90% .02 260);
  background-color: var(--white);
  border-radius: 1rem;
  padding: 1.25rem;

  .header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary);
    margin-bottom: 1rem;

    span {
      color: var(--foreground);
      font-weight: 600;
      font-size: 1.125rem;
    }
  }
}
</style>