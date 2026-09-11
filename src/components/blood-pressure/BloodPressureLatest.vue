<script setup lang="ts">
import type {BloodPressureEntry} from "@/models/bloodPressure.ts";

defineProps<{
  bloodPressures: BloodPressureEntry[] | null | undefined
}>()

function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
</script>

<template>
  <div class="blood-pressure-latest-container">
    <div class="header">
      <span>Historique</span>
    </div>
    <div class="container">
      <div class="blood-pressure-item"
           v-for="bloodPressure in bloodPressures"
           :key="bloodPressure.id">
        <div class="left-side">
          <div class="top">
            <span class="title">{{ formatFullDate(bloodPressure.date) }}</span>
            <span class="moment">{{ bloodPressure.moment }}</span>
          </div>
          <div class="bottom">
            <div
                v-for="(reading, index) in bloodPressure.readings"
                :key="reading.id"
                class="entry"
            >
              <span class="number">M{{ index + 1 }}:</span>
              <span class="value">{{ reading.systolic }}/{{ reading.diastolic }} — PUL {{ reading.pulse }}</span>
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="average-item">
            <span class="label">MOY. SYS</span>
            <span class="value sys">{{ bloodPressure.average_systolic }}</span>
          </div>
          <div class="average-item">
            <span class="label">MOY. DIA</span>
            <span class="value dia">{{ bloodPressure.average_diastolic }}</span>
          </div>
          <div class="average-item">
            <span class="label">MOY. PUL</span>
            <span class="value pul">{{ bloodPressure.average_pulse }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blood-pressure-latest-container {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1),
  0 1px 2px -1px rgba(0, 0, 0, .1),
  0 0 0 1px oklch(90% .02 260);
  background-color: var(--white);
  border-radius: 1rem;
  padding: 1.25rem;
  margin-top: 2rem;

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

  .container {
    position: relative;
    display: flex;
    gap: 1rem;
    flex-direction: column;

    .blood-pressure-item {
      background-color: color-mix(in oklab, var(--secondary) 40%, transparent);
      border: 1px solid var(--input);
      padding: 0.5rem;
      border-radius: 0.625rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 1200px) {
        flex-direction: row;
      }

      .left-side {
        .top {
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .title {
            font-weight: 600;
          }

          .moment {
            color: var(--primary);
            background-color: color-mix(in oklab, var(--primary) 10%, transparent);
            padding: 0.25rem;
            text-transform: uppercase;
            font-weight: 600;
            border-radius: 0.625rem;
            font-size: 0.875rem;
          }
        }

        .bottom {
          display: flex;
          gap: 0.5rem;

          .entry {
            border: 1px solid var(--input);
            padding: 0.25rem;
            border-radius: 0.625rem;
            font-size: 0.75rem;
          }
        }
      }

      .right-side {
        display: flex;
        gap: 1.5rem;

        .average-item {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          .label {
            color: var(--muted-foreground);
            font-size: 0.625rem;
          }

          .value {
            font-weight: 700;
            font-size: 1.125rem;

            &.sys {
              color: var(--primary);
            }

            &.dia {
              color: var(--chart-2);
            }

            &.pul {
              color: var(--chart-4);
            }
          }
        }
      }
    }
  }
}
</style>