export interface BloodPressureReading {
    systolic: number;
    diastolic: number;
    pulse: number;
}

export interface BloodPressureEntry {
    id: number;
    date: string;
    readings: BloodPressureReading[];
}

export interface CreateBloodPressureEntryPayload {
    date: string;
    readings: BloodPressureReading[];
}