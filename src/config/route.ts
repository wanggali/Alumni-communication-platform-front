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
]

export default routes;
