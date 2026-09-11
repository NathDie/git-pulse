export interface BloodPressureReading {
    id: string
    systolic: number;
    diastolic: number;
    pulse: number;
}

export interface BloodPressureEntry {
    id: number;
    date: string;
    average_pulse: number;
    average_systolic: number;
    average_diastolic: number;
    moment: string;
    readings: BloodPressureReading[];
}

export interface CreateBloodPressureEntryPayload {
    date: string;
    readings: BloodPressureReading[];
}