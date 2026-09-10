import { API_BASE_URL, API_TOKEN } from '@/config/env';

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
    }
    return response.json();
}

function buildUrl(endpoint: string): string {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    url.searchParams.set('token', API_TOKEN);
    return url.toString();
}

export const apiClient = {
    get: <T>(endpoint: string): Promise<T> =>
        fetch(buildUrl(endpoint)).then(handleResponse<T>),

    post: <T>(endpoint: string, body: unknown): Promise<T> =>
        fetch(buildUrl(endpoint), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(handleResponse<T>),
};