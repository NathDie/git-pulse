# Git Pulse

A blood pressure tracking app, built to address a personal need for regular monitoring following heart-related health issues.

No more volatile paper notebooks: Git Pulse lets you log your readings, track their evolution over time, and view your averages at a glance.

This repository contains the **frontend** part of the project. It consumes an API built with Symfony (API Platform), which is part of a private dashboard grouping several personal applications — this backend is therefore not public.

## Features

- Log 3 blood pressure readings per entry (morning, noon, evening, night)
- Automatic average calculation per entry and across the full history
- Evolution chart of readings over time
- Detailed history of recent entries

## Tech stack

- Vue 3 (Composition API, `<script setup>`)
- TypeScript
- Chart.js (via vue-chartjs) for the evolution charts
- SCSS for component styling

## Project structure

```
.
├── components/
│   └── blood-pressure/
│       ├── BloodPressureForm.vue
│       ├── BloodPressureChart.vue
│       └── BloodPressureLatest.vue
├── composables/
│   └── useBloodPressure.ts
├── services/
│   ├── apiClient.ts
│   └── bloodPressureApi.ts
├── models/
│   └── bloodPressure.ts
└── enums/
    └── moment.ts
```

## Installation

```bash
npm install
npm run dev
```

Copy `.env.sample` to `.env` and configure the API connection variables:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_API_TOKEN=your_api_token_here
```

## Context

This module is part of a larger personal project. The frontend code is shared here as an example, for others with similar personal health-tracking needs.

## License

MIT