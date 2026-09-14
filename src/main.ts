import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import setGlobalParameters from "./parameters.ts"
const app = createApp(App)

setGlobalParameters(app)
app.mount(app.config.globalProperties.$container)