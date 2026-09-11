import { ref } from 'vue';
import { bloodPressureApi } from '@/services/bloodPressureApi';
import type { BloodPressureEntry, CreateBloodPressureEntryPayload } from '@/models/bloodPressure';

export function useBloodPressure() {
    const entries = ref<BloodPressureEntry[]>([]);
    const latestEntries = ref<BloodPressureEntry[]>([]);
    const latest = ref<BloodPressureEntry | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    async function fetchAll() {
        isLoading.value = true;
        error.value = null;
        try {
            entries.value = await bloodPressureApi.getAll();
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Erreur inconnue';
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchLatest() {
        try {
            latest.value = await bloodPressureApi.getLatest();
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Erreur inconnue';
        }
    }

    async function fetchLatestEntry() {
        try {
            latestEntries.value = await bloodPressureApi.getLatestEntry();
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Erreur inconnue';
        }
    }

    async function createEntry(payload: CreateBloodPressureEntryPayload) {
        const created = await bloodPressureApi.create(payload);
        entries.value.unshift(created);
        latest.value = created;
        return created;
    }

    return { entries, latest, latestEntries, isLoading, error, fetchAll, fetchLatest, fetchLatestEntry, createEntry };
}