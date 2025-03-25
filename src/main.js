import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

// Import Inter font
import '@fontsource/inter/400.css'  // Regular
import '@fontsource/inter/500.css'  // Medium
import '@fontsource/inter/600.css'  // Semi-bold
import '@fontsource/inter/700.css'  // Bold

const app = createApp(App)

app.mount('#app')
