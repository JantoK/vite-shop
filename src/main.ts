import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from '/@/plugins'
import router, { setupRouter } from '/@/router'

const app = createApp(App)

setupAntd(app)

setupRouter(app)

router.isReady().then(() => app.mount('#app'))
