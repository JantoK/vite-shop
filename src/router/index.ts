import { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Welcome',
        component: () => import(/* webpackChunkName: "Welcome" */ '/@/views/welcome.vue'),
        meta: {
            title: '奇趣商城登陆页'
        }
    }
]

const router = createRouter({
    history: createWebHistory(''),
    routes
})

export function setupRouter(app: App) {
    app.use(router)
}

export default router

