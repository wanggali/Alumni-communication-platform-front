import {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/*',
        redirect: '/'
    },
    {
        path: "/",
        name: "home",
        meta: {},
        component: () => import ("../view/home.vue")
    },
    {
        path: "/origin",
        name: "origin",
        meta: {},
        component: () => import ("../view/origin.vue")
    },
    {
        path: "/posts",
        name: "posts",
        meta: {},
        component: () => import ("../view/posts.vue")
    },
    {
        path: "/post/:id",
        name: "post",
        meta: {},
        component: () => import ("../view/post.vue")
    },
    {
        path: "/question/:id",
        name: "question",
        meta: {},
        component: () => import ("../view/question.vue")
    },
    {
        path: "/dynamic/:id",
        name: "dynamic",
        meta: {},
        component: () => import ("../view/dynamic.vue")
    },
    {
        path: "/push",
        name: "push",
        meta: {},
        component: () => import ("../view/push.vue")
    },
    {
        path: "/login",
        name: "login",
        meta: {},
        component: () => import ("../view/login.vue")
    },
    {
        path: "/register",
        name: "register",
        meta: {},
        component: () => import ("../view/register.vue")
    },
    {
        path: "/userInfo",
        name: "userInfo",
        meta: {},
        component: () => import ("../view/userInfo.vue")
    },
    {
        path: "/addDiscuss",
        name: "addDiscuss",
        meta: {},
        component: () => import ("../view/addDiscuss.vue")
    },
    {
        path: "/addDynamic",
        name: "addDynamic",
        meta: {},
        component: () => import ("../view/addDynamic.vue")
    },
    {
        path: "/addQuestion",
        name: "addQuestion",
        meta: {},
        component: () => import ("../view/addQuestion.vue")
    },
]

export default routes;
