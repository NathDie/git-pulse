import type {App} from "vue";

interface GitPulseParameters {
    container: string;
    token: string;
    api_url: string;
}

declare global {
    interface Window {
        git_pulse: GitPulseParameters;
    }
}

const defaultParameters: GitPulseParameters = window.git_pulse;

export default function setGlobalParameters(app: App): void {
    const { container, token, api_url } = defaultParameters;

    app.config.globalProperties.$container = container;
    app.config.globalProperties.$token = token;
    app.config.globalProperties.$api_url = api_url;
}