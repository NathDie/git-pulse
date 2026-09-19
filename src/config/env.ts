export const API_BASE_URL: string = window.git_pulse?.api_url ?? '';
export const API_TOKEN: string = window.git_pulse?.token ?? '';

if (!API_BASE_URL) {
    console.error('[git-pulse] api_url manquant dans window.git_pulse');
}
if (!API_TOKEN) {
    console.error('[git-pulse] token manquant dans window.git_pulse');
}