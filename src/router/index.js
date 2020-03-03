import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const contentsRouter = [{
        path: '/',
        redirect: 'home',
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: '首页'
        },
        component: () => import('../views/home/home.vue')
    },
]

const router = new VueRouter({
    routes: contentsRouter,
})

export default router