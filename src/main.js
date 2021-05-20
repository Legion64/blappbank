import { createApp } from 'vue'
import App from './App.vue'
import Uses from "./core/uses.js";

// Stylesheets
import './assets/css/tailwind.css'
import './assets/css/custom.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App);

// Load custom plugins.
Uses(app);

app.mount('#app')
