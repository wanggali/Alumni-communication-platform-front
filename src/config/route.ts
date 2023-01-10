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
]

export default routes;
