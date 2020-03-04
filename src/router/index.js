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
    {
        path: '/list',
        name: 'list',
        meta: {
            title: '列表'
        },
        component: () => import('../views/list/list.vue')
    },
    {
        path: '/detail',
        name: 'detail',
        meta: {
            title: '详情'
        },
        component: () => import('../views/detail/detail.vue')
    },
]

const router = new VueRouter({
    routes: contentsRouter,
})

export default router