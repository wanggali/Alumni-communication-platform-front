<template>
  <el-container>
    <el-header class="header-acp">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          style="background-color: transparent;backdrop-filter: blur(8px);"
          mode="horizontal"
          :ellipsis="false"
          router
          @select="handleSelect"
      >
        <div class="logo">
          <img class="logo-img" src="../assets/image/logo.png" @click="doReload"/>
          <h1 class="logo-text">校友交流平台</h1>
        </div>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/origin">组织</el-menu-item>
        <el-menu-item index="/posts">文章</el-menu-item>
        <el-menu-item index="/push">内推</el-menu-item>
        <el-menu-item index="/userInfo">个人</el-menu-item>
        <div class="header-search">
          <el-input class="header-input" v-model="keyWord" placeholder="全站搜索" clearable/>
          <div class="search-btn">
            <el-button color="#d5ebe1" :icon="Search" round @click="searchPosts">搜索</el-button>
          </div>
        </div>
        <div class="flex-grow"/>
        <el-menu-item index="/login" v-show="userStore.currentUser.userAvatar==null">登录</el-menu-item>
        <el-menu-item index="/register" v-show="userStore.currentUser.userAvatar==null">注册</el-menu-item>
        <el-sub-menu index="1" v-show="userStore.currentUser.userAvatar!=null">
          <template #title>
            <img class="avatar" :src=userStore.currentUser.userAvatar
                 @click="doReload"/>{{ userStore.currentUser.userName }}
          </template>
          <el-menu-item index="/userInfo">
            <el-icon>
              <User/>
            </el-icon>
            个人中心
          </el-menu-item>
          <el-menu-item index="/" style="color: red" @click="logout">
            <el-icon>
              <SwitchButton/>
            </el-icon>
            退出登录
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2" class="send">
          <template #title>
            <el-icon>
              <Star/>
            </el-icon>
            发布
          </template>
          <el-menu-item index="/addDiscuss">
            <el-icon>
              <Apple/>
            </el-icon>
            写帖子
          </el-menu-item>
          <el-menu-item index="/addQuestion">
            <el-icon>
              <KnifeFork/>
            </el-icon>
            提问题
          </el-menu-item>
          <el-menu-item index="/addDynamic">
            <el-icon>
              <Mug/>
            </el-icon>
            发动态
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>
      <div class="footer">
        <a title="github" target="_blank" href="https://github.com/wanggali">
          <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              content="查看本站及源码，欢迎star"
          >
            <template #reference>
              <span class="iconfont icon-github-fill">支持项目</span>
            </template>
          </el-popover>
        </a>
        <a title="contact" target="_blank" href="https://im.qq.com/index">
          <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              content="QQ号：2722933638"
          >
            <template #reference>
              <span class="iconfont icon-QQ">联系作者</span>
            </template>
          </el-popover>
        </a>
        <a title="info" target="_blank">
          <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              content="本站所有资源均来源于网络，仅供学习参考，如有侵权，非常抱歉，请立即联系作者删除"
          >
            <template #reference>
              <span class="iconfont icon-toubaoshengming">免责声明</span>
            </template>
          </el-popover>
        </a>
        <a title="info" target="_blank" href="https://support.qq.com/product/498632">
          <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              content="如发现bug，作者大大的感谢您！"
          >
            <template #reference>
              <span><el-icon><Platform /></el-icon>建设反馈</span>
            </template>
          </el-popover>
        </a>
      </div>
      <div class="footer-text">
        <span><el-icon><InfoFilled/></el-icon>2023 校友交流平台</span>
      </div>
    </el-footer>
  </el-container>
  <el-backtop target="#app"/>
</template>

<script lang="ts" setup>
import {ref, watch, onMounted} from 'vue'
import {Search} from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "../stores/user";

const userStore = useUserStore()
userStore.getUserInfo()
const activeIndex = ref('/')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  activeIndex.value = key
}

const doReload = () => {
  router.push('/')
}

const route = useRoute();
const router = useRouter();
watch(route, (newValue, oldValue) => {
  activeIndex.value = route.path
})

const logout = () => {
  localStorage.removeItem('acp_token')
  location.reload()
}
const keyWord = ref<string>('')
const searchPosts = () => {
  router.push({path:'/posts',query:keyWord,params:keyWord})
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.footer {
  text-align: center;
  position: relative;
}

.footer > a {
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  padding: 20px;
  color: #303133;
}

.footer-text {
  text-align: center;
  position: relative;
  padding-top: 10px;
  color: #303133;
}

.logo {
  box-sizing: border-box;
  cursor: pointer;
  width: 195px;
}

.logo .logo-img {
  height: 42px;
  float: left;
  margin-top: 12px;
  margin-right: 12px;
}

.logo-text {
  margin-top: 12px;
  margin-left: 12px !important;
  font-weight: 400 !important;
}

.header-search {
  padding-left: 230px;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
  padding-top: 12px;
  width: 350px;
}

.header-input {
  height: 35px;
  width: 270px;
  border-radius: 16px 0 0 16px;
  text-indent: 10px;
}

.search-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 60px;
  height: 35px;
  cursor: pointer;
}

.avatar {
  height: 42px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
  border-radius: 50%;
}

.send {
  display: block;
  min-width: 88px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  border-radius: 20px;
  margin-top: 12px;
  font-weight: bolder;
}

.swiper {
  margin-top: 15px;
}

.content .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content .text {
  font-size: 14px;
}

.content .item {
  margin-bottom: 18px;
}

.content .box-card {
  width: 980px;
  margin-top: 15px;
}

.notice .box-card {
  margin-left: 30px;
  width: 450px;
  margin-top: 15px;
}

.header-acp {
  position: fixed;
  inset-block-start: 0;
  width: 100%;
  z-index: 100;
  inset-inline-end: 0;
  background-color: transparent;
}
</style>
