import {RouteRecordRaw} from "vue-router";

const routes:RouteRecordRaw[] = [
    {
        path: '/*',
        redirect: '/'
    },
    {
        path: "/",
        name: "home",
        meta: {

        },
        component: () => import ("../view/home.vue")
    },
    {
        path: "/origin",
        name: "origin",
        meta: {

        },
        component: () => import ("../view/origin.vue")
    },
    {
        path: "/posts",
        name: "posts",
        meta: {

        },
        component: () => import ("../view/posts.vue")
    },
]

export default routes;
