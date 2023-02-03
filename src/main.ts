import {createApp} from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import routes from "./config/route";
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './assets/css/icon.css'
// 引入v-md-editor组件
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import Prism from 'prismjs';
// 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {top: 0}
    },
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('acp_token');
    if (!token && to.path === '/userInfo') {
        next('/login');
    } else {
        next();
    }
});
//创建持久化存储库，类似于以前的vuex
const pinia = createPinia()
VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});
VMdPreview.use(githubTheme);
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus, {
    locale: zhCn,
})

app.use(VueMarkdownEditor);
app.use(VMdPreview);
// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
