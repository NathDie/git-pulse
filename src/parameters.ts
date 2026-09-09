import type {App} from "vue";

interface GitPulseParameters {
    container: string;
    userId: string;
    token: string;
}

declare global {
    interface Window {
        git_pulse: GitPulseParameters;
    }
}

const defaultParameters: GitPulseParameters = window.git_pulse;

export default function setGlobalParameters(app: App): void {
    const { container, userId, token } = defaultParameters;

    app.config.globalProperties.$container = container;
    app.config.globalProperties.$userId = userId;
    app.config.globalProperties.$token = token;
}