import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from '/@/plugins'
import router, { setupRouter } from '/@/router'
import { setupStore } from '/@/store'

const app = createApp(App)

setupAntd(app)

setupRouter(app)

setupStore(app)

router.isReady().then(() => app.mount('#app'))
