<template>
  <div class="swiper" style="margin-top: 50px">
    <el-carousel :interval="4000" type="card" height="280px">
      <el-carousel-item v-for="item in bannerList.items" :key="item">
        <img :src="item.imageUrl">
      </el-carousel-item>
    </el-carousel>
  </div>
  <el-row :gutter="20" style="margin-top: 10px" v-loading="loading">
    <el-col :span="16">
      <div class="tabs">
        <el-tabs
            type="card"
            @tab-click="handleClick"
        >
          <el-tab-pane label="最新" key="first"></el-tab-pane>
          <el-tab-pane v-for="(item,index) in tagList" :key="index" :name="item.id"
                       :label="item.name"></el-tab-pane>
        </el-tabs>
      </div>
      <el-divider content-position="left">
        <el-icon>
          <star-filled/>
        </el-icon>
        <span style="font-size: 20px">帖子</span>
      </el-divider>
      <div class="content" v-for="(item,index) in indexInfo?.discuss" :key="index">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="item.userInfo.userAvatar">
              <el-tooltip placement="bottom-start" effect="light">
                <template #content>
                  <span style="font-size: 14px;">学院：{{ item.userInfo.collegeName }}</span><br/>
                  <span style="font-size: 14px;margin-top: 5px">地区：{{ item.userInfo.regionName }}</span><br>
                  <span style="font-size: 14px;margin-top: 5px">签名：{{ item.userInfo.userSign }}</span>
                </template>
                <a>{{ item.userInfo.userName }}</a>
              </el-tooltip>
            </div>
          </template>
          <div class="message">
            <div class="text">
              <a target="_blank" href="">
                <h5>{{ item.title }}</h5>
              </a>
              <v-md-preview :text="item.message"></v-md-preview>
              <el-tag type="success" round>{{ item.tagName }}</el-tag>
              <div style="margin-top: 12px;">
                <span style="color: #00000073;">{{ item.createTime }}</span>
                <el-divider direction="vertical"/>
                <span style="cursor: pointer" @click="addDiscussUp(item)">
                  <i class="iconfont icon-dianzan" v-if="isUp"></i>
                  <i class="iconfont icon-dianzan1" v-else></i>
                  &nbsp;{{ item.up }}
                </span>
                <el-divider direction="vertical"/>
                <span style="cursor: pointer" @click="reduceDiscussUp(item)">
                  <i class="iconfont icon-cai" v-if="isDown"></i>
                  <i class="iconfont icon-cai1" v-else></i>
                  &nbsp;{{ item.down }}
                </span>
                <el-divider direction="vertical"/>
                <span style="cursor: pointer">
                  <el-icon><ChatDotRound/></el-icon>
                </span>
              </div>
            </div>
            <img :src="item.cover"/>
          </div>
        </el-card>
      </div>
      <el-empty v-show="indexInfo?.discuss?.length===0" :image-size="200"/>
      <el-divider content-position="left">
        <el-icon>
          <star-filled/>
        </el-icon>
        <span style="font-size: 20px">问题</span>
      </el-divider>
      <div class="content" v-for="(item,index) in indexInfo?.questions" :key="index">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="item.userInfo.userAvatar">
              <el-tooltip placement="bottom-start" effect="light">
                <template #content>
                  <span style="font-size: 14px;">学院：{{ item.userInfo.collegeName }}</span><br/>
                  <span style="font-size: 14px;margin-top: 5px">地区：{{ item.userInfo.regionName }}</span><br>
                  <span style="font-size: 14px;margin-top: 5px">签名：{{ item.userInfo.userSign }}</span>
                </template>
                <a>{{ item.userInfo.userName }}</a>
              </el-tooltip>
            </div>
          </template>
          <div class="message">
            <div class="text">
              <a target="_blank" href="">
                <h5>{{ item.title }}</h5>
              </a>
              <v-md-preview :text="item.content"></v-md-preview>
              <el-tag type="success" round>{{ item.tagName }}</el-tag>
              <div style="margin-top: 12px;">
                <span style="color: #00000073;">{{ item.createTime }}</span>
                <el-divider direction="vertical"/>
                <span style="cursor: pointer">
                  <el-icon><ChatDotRound/></el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <el-empty v-show="indexInfo?.questions?.length===0" :image-size="200"/>
      <el-divider content-position="left">
        <el-icon>
          <star-filled/>
        </el-icon>
        <span style="font-size: 20px">动态</span>
      </el-divider>
      <div class="content" v-for="(item,index) in indexInfo?.dynamics" :key="index">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="item.userInfo.userAvatar">
              <el-tooltip placement="bottom-start" effect="light">
                <template #content>
                  <span style="font-size: 14px;">学院：{{ item.userInfo.collegeName }}</span><br/>
                  <span style="font-size: 14px;margin-top: 5px">地区：{{ item.userInfo.regionName }}</span><br>
                  <span style="font-size: 14px;margin-top: 5px">签名：{{ item.userInfo.userSign }}</span>
                </template>
                <a>{{ item.userInfo.userName }}</a>
              </el-tooltip>
            </div>
          </template>
          <div class="message">
            <div class="text">
              <a target="_blank" href="">
                <h5>首页动态</h5>
              </a>
              <v-md-preview :text="item.content"></v-md-preview>
              <el-tag type="success" round>{{ item.tagName }}</el-tag>
              <div style="margin-top: 12px;">
                <span style="color: #00000073;">{{ item.createTime }}</span>
                <el-divider direction="vertical"/>
                <span style="cursor: pointer" @click="addDynamicUp(item)">
                  <i class="iconfont icon-dianzan" v-if="isDynamicUp"></i>
                  <i class="iconfont icon-dianzan1" v-else></i>
                  &nbsp;{{ item.up }}
                </span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <el-empty v-show="indexInfo?.dynamics?.length===0" :image-size="200"/>
      <div style="text-align: center;margin-top: 15px">
        <el-button color="#d5ebe1" :icon="IceCreamRound" round @click="$router.push('posts')">点击查看更多</el-button>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="content">
        <div class="notice">
          <el-card class="box-card">
            <div style="font-size: 16px">
              🌈 官方最新公告
              <a style="color:#00000073;cursor: pointer" @click="showAllNotice">(历史公告)</a></div>
            <div class="notice">
              <v-md-preview :text="noticeList[0]?.content"></v-md-preview>
            </div>
          </el-card>
          <el-card class="box-card">
            <div style="font-size: 16px"> 🎅🏽 关于本站</div>
            <br/>
            <div style="color:#00000073">一个充满着青春气息，活力满满的校友交流平台</div>
          </el-card>
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script lang="ts" setup>
import {getBannerInfo} from "../api/banner";
import {onMounted, ref, reactive, computed} from "vue";
import work from "../models/work";
import {getTagInfo} from "../api/tag";
import {TabsPaneContext, ElMessage} from "element-plus";
import {getNoticeInfo} from "../api/notice";
import {getIndexInfo} from "../api/home";
import _ from "lodash";
import {IceCreamRound} from '@element-plus/icons-vue'
import {addDiscussUpInfo} from "../api/discuss";
import {addDynamicUpInfo} from "../api/dynamic";

const text = ref<string>('')
const loading = ref(true)
const bannerQuery = ref<work>({
  pageNum: 1,
  pageSize: 5
})
onMounted(() => {
  getBannerList()
  getTagList()
  getNoticeList()
  getHomeMsgInfo()
  loading.value = false
})
const bannerList = ref<any>({})
const getBannerList = async () => {
  const result = await getBannerInfo(bannerQuery.value)
  if (result.code == 0) {
    bannerList.value = {...result.data}
  }
}

const tagList = ref<any>({})
const getTagList = async () => {
  const result = await getTagInfo()
  if (result.code == 0) {
    tagList.value = {...result.data}
  }
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  Object.values(tagList.value).forEach((e: any, index, arr) => {
    if (tab.props.label == e.name) {
      getIndexReq.tid = parseInt(tab.props.name, 10)
    } else if (tab.props.label == '最新') {
      getIndexReq.tid = null
    }
  })
  getHomeMsgInfo()
}

const noticeList = ref<any>({})
const noticeQuery = ref<work>({
  pageNum: 1,
  pageSize: 1
})
const getNoticeList = async () => {
  const result = await getNoticeInfo(noticeQuery.value)
  if (result.code == 0) {
    noticeList.value = {...result.data.items}
  }
}

const showAllNotice = () => {
  ElNotification({
    title: '历史公告',
    message: '后续上架',
    type: 'info',
  })
}
const getIndexReq = reactive<any>({
  tid: null
})
const indexInfo = ref<any>({})
const getHomeMsgInfo = async () => {
  const result = await getIndexInfo(getIndexReq)
  if (result.code == 0) {
    indexInfo.value = {...result.data}
  }
}

const isUp = ref<boolean>(true)
const addDiscussUpReq = reactive<any>({
  id: null,
  up: 0,
  down: 0
})
const addDiscussUp = _.throttle(async (item: any) => {
  addDiscussUpReq.id = item.id
  if (isUp.value) {
    item.up++
    addDiscussUpReq.up = 1
  } else {
    item.up--
    addDiscussUpReq.up = -1
  }
  isUp.value = !isUp.value
  const result = await addDiscussUpInfo(addDiscussUpReq)
  if (result.code == 0) {
    ElMessage.success('操作成功！')
  } else {
    ElMessage.error(result.message)
  }
}, 1000)

const isDown = ref<boolean>(true)
const reduceDiscussUp = _.throttle(async (item: any) => {
  addDiscussUpReq.id = item.id
  if (isDown.value) {
    item.down++
    addDiscussUpReq.down = 1
  } else {
    item.down--
    addDiscussUpReq.down = -1
  }
  isDown.value = !isDown.value
  const result = await addDiscussUpInfo(addDiscussUpReq)
  if (result.code == 0) {
    ElMessage.success('操作成功！')
  } else {
    ElMessage.error(result.message)
  }
}, 1000)

const isDynamicUp = ref<boolean>(true)
const addDynamicUpReq = reactive<any>({
  id: null,
  up: 0
})
const addDynamicUp = _.throttle(async (item: any) => {
  addDynamicUpReq.id = item.id
  if (isDynamicUp.value) {
    item.up++
    addDynamicUpReq.up = 1
  } else {
    item.up--
    addDynamicUpReq.up = -1
  }
  isDynamicUp.value = !isDynamicUp.value
  const result = await addDynamicUpInfo(addDynamicUpReq)
  if (result.code == 0) {
    ElMessage.success('操作成功！')
  } else {
    ElMessage.error(result.message)
  }
}, 1000)
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

.content .box-card .notice {
  margin-top: 15px;
  color: #00000073;
}

.notice .box-card {
  margin-left: 30px;
  width: 450px;
  margin-top: 15px;
}

.content .box-card .message img {
  width: 15%;
  float: right;
  display: inline-block;
}

.content .box-card .message .text {
  display: block;
  flex: 1 1;
}

.content .box-card .message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  color: #000000d9;
}

.content .box-card .message a h5 {
  margin-bottom: 0.5em;
  color: #000000d9;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
}

.content .box-card .message a h5:hover {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color .3s;
}

.content .box-card .card-header img {
  height: 42px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
  border-radius: 50%;
}

.content .box-card .card-header {
  display: flex;
  flex: 1 1;
  align-items: flex-start;
  max-width: 100%;
}

.content .box-card .card-header a {
  flex: 1 0;
  width: 0;
  color: #000000d9;
  margin-top: 20px;
  cursor: pointer;
}

.content .box-card .card-header a:hover {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color .3s;
}

.content .box-card .card-header .tooltip-user img {
  height: 42px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
}
</style>
