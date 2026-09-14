export interface BloodPressureReading {
    id: string
    systolic: number;
    diastolic: number;
    pulse: number;
}

export interface BloodPressureReadingCreate {
    systolic: number | null;
    diastolic: number | null;
    pulse: number | null;
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
    moment: string
    readings: BloodPressureReadingCreate[];
}