<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {Line} from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import {bloodPressureApi} from '@/services/bloodPressureApi';
import type {BloodPressureEntry} from '@/models/bloodPressure';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const entries = ref<BloodPressureEntry[]>([]);

onMounted(async () => {
  entries.value = await bloodPressureApi.getAll();
});

function formatEntryLabel(entry: BloodPressureEntry): string {
  const date = new Date(entry.date);
  const shortDate = new Intl.DateTimeFormat('fr-FR', {day: '2-digit', month: '2-digit'}).format(date);
  return `${shortDate} - ${entry.moment}`;
}

const chartData = computed(() => ({
  labels: entries.value.map(formatEntryLabel),
  datasets: [
    {
      label: 'Moy. SYS',
      data: entries.value.map((e) => e.average_systolic),
      borderColor: '#155dfc',
      backgroundColor: '#155dfc',
      tension: 0.3,
    },
    {
      label: 'Moy. DIA',
      data: entries.value.map((e) => e.average_diastolic),
      borderColor: '#00a153',
      backgroundColor: '#00a153',
      tension: 0.3,
    },
    {
      label: 'Moy. PUL',
      data: entries.value.map((e) => e.average_pulse),
      borderColor: '#fe9a00',
      backgroundColor: '#fe9a00',
      tension: 0.3,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 30,
      max: 200,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        title: (items: any[]) => items[0]?.label ?? '',
        label: (item: any) => `${item.dataset.label} : ${item.formattedValue}`,
      },
    },
  },
};
</script>

<template>
  <div class="blood-pressure-chart-container">
    <div class="header">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-trending-up h-5 w-5 text-primary" aria-hidden="true"
           data-tsd-source="/src/routes/index.tsx:359:13">
        <path d="M16 7h6v6"></path>
        <path d="m22 7-8.5 8.5-5-5L2 17"></path>
      </svg>
      <span>Évolution des moyennes</span>
    </div>
    <div class="container">
      <Line :data="chartData" :options="chartOptions"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blood-pressure-chart-container {
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
    height: 24rem;
    position: relative;
  }
}
</style>