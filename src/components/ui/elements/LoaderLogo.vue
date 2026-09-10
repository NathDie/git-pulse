<script setup lang="ts">
</script>
<template>
  <div class="loader">
    <div class="loader__spinner">
      <img alt="Git Pulse Logo" class="logo" src="../../../assets/img/logo.svg" />
    </div>
  </div>
</template>

<style lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: var( --background );
  z-index: 1000;

  &__spinner {
    img {
      width: 12rem;
      animation: spin 2s linear infinite;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>