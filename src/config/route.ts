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
    {
        path: "/post/:id",
        name: "post",
        meta: {

        },
        component: () => import ("../view/post.vue")
    },
    {
        path: "/question/:id",
        name: "question",
        meta: {

        },
        component: () => import ("../view/question.vue")
    },
    {
        path: "/dynamic/:id",
        name: "dynamic",
        meta: {

        },
        component: () => import ("../view/dynamic.vue")
    },
    {
        path: "/push",
        name: "push",
        meta: {

        },
        component: () => import ("../view/push.vue")
    },
]

export default routes;
