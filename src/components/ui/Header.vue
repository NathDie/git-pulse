<script setup lang="ts">
import type {BloodPressureEntry} from "@/models/bloodPressure.ts";

defineProps<{
  latestBloodPressure: BloodPressureEntry | null | undefined
}>()

const formatDate = (dateString: string | undefined): string => {
  if (typeof dateString !== "string") return "-";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(date);
};
</script>

<template>
  <header>
    <div class="left-side">
      <div class="top">
        <div class="logo">
          <img alt="Vue logo" class="logo" src="@/assets/img/logo.svg"/>
        </div>
        <div class="title">
          <h1>Git Pulse</h1>
        </div>
      </div>
      <div class="bottom">
        <p>Enregistrez 3 mesures et suivez vos moyennes au quotidien</p>
      </div>
    </div>
    <div class="right-side">
      <div class="latest-blood-pressure">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true">
            <path
                d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>
        </div>
        <div class="content">
          <span class="text">Dernière mesure : {{formatDate(latestBloodPressure?.date) }} - {{ latestBloodPressure?.moment }}</span>
          <span class="value">{{ latestBloodPressure?.average_systolic }}/{{ latestBloodPressure?.average_diastolic }} — PUL {{latestBloodPressure?.average_pulse }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  .left-side {
    display: flex;
    flex-direction: column;

    .top {
      display: flex;
      align-items: center;
      gap: 1rem;

      img {
        max-width: 4rem;
      }

      h1 {
        font-weight: 700;
        font-size: 1.875rem;
      }
    }

    .bottom {
      p {
        margin: 0;
        color: var(--muted-foreground);
        font-size: 0.875rem;
        font-weight: 500;
      }
    }
  }

  .right-side {
    .latest-blood-pressure {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1),
      0 1px 2px -1px rgba(0, 0, 0, .1),
      0 0 0 1px oklch(90% .02 260);
      background-color: var(--white);
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon {
        background-color: var(--primary-10);
        color: var(--primary);
        border-radius: 5rem;
        padding: 0.5rem;
      }

      .content {
        span {
          display: block;

          &.text {
            color: var(--mutted-foreground);
            font-size: 0.75rem;
          }

          &.value {
            font-weight: 700;
            font-size: 1.125rem;
          }
        }
      }
    }
  }
}
</style>