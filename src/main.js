import { createApp } from 'vue'
import App from './App.vue'
import Uses from "./core/uses.js";
import Directives from './core/directives/index.js'

// Stylesheets
import './assets/css/tailwind.css'
import './assets/css/custom.css'
import 'vue-toastification/dist/index.css'
import 'leaflet/dist/leaflet.css'

const app = createApp(App);

// Load custom plugins.
Uses(app);

// Load custom directives.
Directives(app)

app.mount('#app')
