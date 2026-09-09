import { API_BASE_URL } from '@/config/env';

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
    }
    return response.json();
}

export const apiClient = {
    get: (endpoint: string) =>
        fetch(`${API_BASE_URL}${endpoint}`).then(handleResponse),

    post: (endpoint: string, body: unknown) =>
        fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(handleResponse),
};