import { apiClient } from './apiClient';
import type {
    BloodPressureEntry,
    CreateBloodPressureEntryPayload,
} from '@/models/bloodPressure';

export const bloodPressureApi = {
    getAll: (): Promise<BloodPressureEntry[]> =>
        apiClient.get<BloodPressureEntry[]>('/blood-pressures'),

    getLatestEntry: (): Promise<BloodPressureEntry[]> =>
        apiClient.get<BloodPressureEntry[]>('/blood-pressures/latest'),

    getLatest: (): Promise<BloodPressureEntry> =>
        apiClient.get<BloodPressureEntry>('/blood-pressures/latest-entry'),

    create: (payload: CreateBloodPressureEntryPayload): Promise<BloodPressureEntry> =>
        apiClient.post<BloodPressureEntry>('/blood-pressures', payload),
};