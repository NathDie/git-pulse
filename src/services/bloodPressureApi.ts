import { apiClient } from './apiClient';
import type {
    BloodPressureEntry,
    CreateBloodPressureEntryPayload,
} from '@/models/bloodPressure';

export const bloodPressureApi = {
    getAll: (): Promise<BloodPressureEntry[]> =>
        apiClient.get<BloodPressureEntry[]>('/blood-pressures'),

    getLatest: (): Promise<BloodPressureEntry> =>
        apiClient.get<BloodPressureEntry>('/blood-pressures/latest'),

    create: (payload: CreateBloodPressureEntryPayload): Promise<BloodPressureEntry> =>
        apiClient.post<BloodPressureEntry>('/blood-pressures', payload),
};