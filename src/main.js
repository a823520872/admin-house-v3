import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router.js'
import './styles/app.css'

let app = createApp(App)

app.config.devtools = true
app.use(ElementPlus)
app.use(router)

app.mount('#app')
