<script setup lang="ts">
import { ref } from 'vue';
import { Moment, momentLabel } from '@/enums/moment';
import { bloodPressureApi } from '@/services/bloodPressureApi.ts';
import Loader from '@/components/ui/elements/Loader.vue';

interface Reading {
  systolic: number | null;
  diastolic: number | null;
  pulse: number | null;
}

const date = ref<string>('');
const moment = ref<Moment>(Moment.MORNING);
const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);

const readings = ref<Reading[]>([
  { systolic: null, diastolic: null, pulse: null },
  { systolic: null, diastolic: null, pulse: null },
  { systolic: null, diastolic: null, pulse: null },
]);

async function submit() {
  isSubmitting.value = true;
  errorMessage.value = null;

  try {
    const payload = {
      date: date.value,
      moment: moment.value,
      readings: readings.value,
    };

    await bloodPressureApi.create(payload);

    // reset du formulaire après succès
    date.value = '';
    moment.value = Moment.MORNING;
    readings.value = [
      { systolic: null, diastolic: null, pulse: null },
      { systolic: null, diastolic: null, pulse: null },
      { systolic: null, diastolic: null, pulse: null },
    ];
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : 'Une erreur est survenue.';
  } finally {
    isSubmitting.value = false;
  }
}
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
    <form @submit.prevent="submit">
      <div class="top">
        <div class="field">
          <label for="date">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            Date
          </label>
          <input type="date" v-model="date" id="date"/>
        </div>

        <div class="field">
          <label for="moment">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            Moment de la journée
          </label>
          <select v-model="moment" id="moment">
            <option v-for="option in Object.values(Moment)" :key="option" :value="option">
              {{ momentLabel(option) }}
            </option>
          </select>
        </div>
      </div>
      <div class="bottom">
        <fieldset v-for="(reading, index) in readings" :key="index">
          <span class="title">Mesure {{ index + 1 }}</span>

          <div class="container">
            <div class="field">
              <label :for="'systolic-' + index">
                SYS
              </label>
              <input type="number" v-model.number="reading.systolic" :id="'systolic-' + index" placeholder="120"/>
            </div>

            <div class="field">
              <label :for="'diastolic-' + index">
                DIA
              </label>
              <input type="number" v-model.number="reading.diastolic" :id="'diastolic-' + index" placeholder="80"/>
            </div>

            <div class="field">
              <label :for="'pulse-' + index">
                PUL
              </label>
              <input type="number" v-model.number="reading.pulse" :id="'pulse-' + index" placeholder="70"/>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="actions">
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button type="submit" :disabled="isSubmitting">
          <Loader v-if="isSubmitting" />
          <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Enregistrer les mesures
          </template>
        </button>
      </div>
    </form>
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

  form {
    input, select {
      border-radius: 0.625rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      background-color: var(--background);
      border: 1px solid var(--input);
      outline: none;
      padding: 0.625rem 0.75rem;
      min-width: 0;
      box-sizing: border-box;
    }

    .bottom {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 1rem;

      @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
      }

      fieldset {
        background-color: color-mix(in oklab, var(--secondary) 40%, transparent);
        border: 1px solid var(--input);
        padding: 1rem;
        border-radius: 0.625rem;
        min-width: 0;

        .title {
          color: var(--primary);
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.75rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .container {
          display: flex;
          gap: 0.5rem;
          min-width: 0;

          .field {
            min-width: 0;
            flex: 1;

            label {
              display: block;
              margin-bottom: 0.25rem;
              color: var(--muted-foreground);
              font-weight: 500;
              font-size: 0.625rem;
            }

            input {
              width: 100%;
              min-width: 0;
              box-sizing: border-box;
            }
          }
        }
      }
    }

    .top {
      display: flex;
      margin-bottom: 1rem;
      gap: 1rem;
      flex-direction: column;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }

      > div {
        @media (min-width: 768px) {
          width: 50%;
        }

        label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          line-height: 1.25rem;
          padding-bottom: 0.25rem;

          svg {
            width: 1rem;
          }
        }

        input, select {
          width: 100%;
        }
      }
    }

    .actions {
      margin-top: 1rem;

      button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: var(--white);
        background-color: var(--primary);
        padding: 0.5rem 0.75rem;
        border-radius: 0.625rem;
        font-size: 0.875rem;
        width: 100%;
        justify-content: center;

        @media (min-width: 768px) {
          width: auto;
        }

        &:hover {
          background-color: color-mix(in oklab, var(--primary) 90%, transparent);
        }
      }
    }
  }
}
</style>