<template>
  <div class="origin-choose">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form
              label-width="100px"
              :model="getPostsReq"
              style="max-width: 460px"
          >
            <el-form-item label="标签名">
              <tag-select @get-tag-id="getTagId"/>
            </el-form-item>
            <el-form-item label="标题/内容">
              <el-input v-model="getPostsReq.title"/>
            </el-form-item>
            <el-form-item>
              <el-button color="#d5ebe1" :icon="Search" round
                         @click="getPostsData">搜索
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <div class="discuss-main">
    <el-divider content-position="left">
      <el-icon>
        <star-filled/>
      </el-icon>
      <span style="font-size: 20px">帖子</span>
    </el-divider>
    <div v-show="Object.keys(discussData).length !== 0">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="content" v-for="(item,index) in discussData" :key="index">
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
                  <router-link target="_blank" :to="`/post/${item.id}`">
                    <h5>{{ item.title }}</h5>
                  </router-link>
                  <v-md-preview :text="item.message"></v-md-preview>
                  <el-tag type="success" round>{{ item.tagName }}</el-tag>
                  <div style="margin-top: 12px;">
                    <span style="color: #00000073;">{{ item.createTime }}</span>
                    <el-divider direction="vertical"/>
                    <span style="cursor: pointer" @click="addDiscussUp(item)">
                  <i class="iconfont icon-dianzan" v-if="!item.isUp"></i>
                  <i class="iconfont icon-dianzan1" v-else></i>
                  &nbsp;{{ item.up }}
                </span>
                    <el-divider direction="vertical"/>
                    <span style="cursor: pointer" @click="reduceDiscussUp(item)">
                  <i class="iconfont icon-cai" v-if="!item.isDown"></i>
                  <i class="iconfont icon-cai1" v-else></i>
                  &nbsp;{{ item.down }}
                </span>
                    <el-divider direction="vertical"/>
                    <span style="cursor: pointer" @click="$router.push(`/post/${item.id}`)">
                  <el-icon><ChatDotRound/></el-icon>
                </span>
                  </div>
                </div>
                <img :src="item.cover"/>
              </div>
            </el-card>
          </div>
          <el-empty v-show="Object.keys(discussData).length === 0" :image-size="200"/>
        </el-col>
      </el-row>
    </div>
    <el-empty v-show="Object.keys(discussData).length === 0" :image-size="200"/>
  </div>
  <div class="discuss-main">
    <el-divider content-position="left">
      <el-icon>
        <star-filled/>
      </el-icon>
      <span style="font-size: 20px">问题</span>
    </el-divider>
    <div v-show="Object.keys(questionData).length !== 0">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="content" v-for="(item,index) in questionData" :key="index">
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
                  <router-link target="_blank" :to="`/question/${item.id}`">
                    <h5>{{ item.title }}</h5>
                  </router-link>
                  <v-md-preview :text="item.content"></v-md-preview>
                  <el-tag type="success" round>{{ item.tagName }}</el-tag>
                  <div style="margin-top: 12px;">
                    <span style="color: #00000073;">{{ item.createTime }}</span>
                    <el-divider direction="vertical"/>
                    <span style="cursor: pointer" @click="$router.push(`/question/${item.id}`)">
                  <el-icon><ChatDotRound/></el-icon>
                </span>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-empty v-show="Object.keys(questionData).length === 0" :image-size="200"/>
  </div>
  <div class="discuss-main">
    <el-divider content-position="left">
      <el-icon>
        <star-filled/>
      </el-icon>
      <span style="font-size: 20px">动态</span>
    </el-divider>
    <div v-show="Object.keys(dynamicData).length !== 0">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="content" v-for="(item,index) in dynamicData" :key="index">
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
                  <router-link target="_blank" :to="`/dynamic/${item.id}`">
                    <h5>首页动态</h5>
                  </router-link>
                  <v-md-preview :text="item.content"></v-md-preview>
                  <el-tag type="success" round>{{ item.tagName }}</el-tag>
                  <div style="margin-top: 12px;">
                    <span style="color: #00000073;">{{ item.createTime }}</span>
                    <el-divider direction="vertical"/>
                    <span style="cursor: pointer" @click="addDynamicUp(item)">
                  <i class="iconfont icon-dianzan" v-if="!item.isUp"></i>
                  <i class="iconfont icon-dianzan1" v-else></i>
                  &nbsp;{{ item.up }}
                </span>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-empty v-show="Object.keys(dynamicData).length === 0" :image-size="200"/>
  </div>
  <div class="pagination">
    <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="getPostsReq.pageNum"
        :page-size="getPostsReq.pageSize"
        :total="pageTotal"
        @current-change="handlePageChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import {getOriginInfo} from "../api/origin";
import {ref, reactive, onMounted, computed} from "vue";
import {Search, House, Monitor} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import CollegeSelect from "../components/collegeSelect.vue";
import {addOriginUserInfo, getOriginUserInfo} from "../api/originUser";
import {addDiscussUpInfo, getDiscussInfo} from "../api/discuss";
import TagSelect from "../components/tagSelect.vue";
import {getQuestionInfo} from "../api/question";
import _ from "lodash";
import {addDynamicUpInfo, getDynamicInfo} from "../api/dynamic";
import {useUserStore} from "../stores/user";
import {useRoute, useRouter} from "vue-router";

const userStore = useUserStore()
userStore.getUserInfo()

const router = useRouter()
const route = useRoute()
onMounted(() => {
  getPostsReq.title = route.query._value
  getDiscussData()
  getQuestionData()
  getDynamicData()
})
const getPostsReq = reactive<any>({
  pageNum: 1,
  pageSize: 10,
  tid: null,
  title: null,
  content: null,
  sortType: null,
})
const discussPageTotal = ref(0);
const discussData = ref<any>({})
const getDiscussData = async () => {
  getPostsReq.isAuditType = 1
  const result = await getDiscussInfo(getPostsReq)
  if (result.code == 0) {
    discussData.value = {...result.data.items}
    discussPageTotal.value = result.data.total
  } else {
    ElMessage.error(result.message)
  }
}

const questionPageTotal = ref(0);
const questionData = ref<any>({})
const getQuestionData = async () => {
  getPostsReq.isAudit = 1
  const result = await getQuestionInfo(getPostsReq)
  if (result.code == 0) {
    questionData.value = {...result.data.items}
    questionPageTotal.value = result.data.total
  } else {
    ElMessage.error(result.message)
  }
}

// 分页导航
const handlePageChange = (val: number) => {
  getPostsReq.pageNum = val;
  getDiscussData();
  getQuestionData();
};

const getTagId = (id: number) => {
  getPostsReq.tid = id
}

const pageTotal = computed(() => {
  const max = discussPageTotal.value > questionPageTotal.value ? discussPageTotal.value : questionPageTotal.value;
  // return max>num3 ? max : num3;
  return max
})

const dynamicPageTotal = ref(0);
const dynamicData = ref<any>({})
const getDynamicData = async () => {
  const result = await getDynamicInfo(getPostsReq)
  if (result.code == 0) {
    dynamicData.value = {...result.data.items}
    dynamicPageTotal.value = result.data.total
  } else {
    ElMessage.error(result.message)
  }
}

const addDiscussUpReq = reactive<any>({
  id: null,
  uid: null,
  flag: 'up'
})
const addDiscussUp = _.throttle(async (item: any) => {
  if (userStore.currentUser.userId == null) {
    ElMessage.warning('登录后才能点赞哟！')
    return;
  }
  addDiscussUpReq.id = item.id
  addDiscussUpReq.uid = userStore.currentUser.userId
  if (!item.isUp) {
    item.up++
  } else {
    item.up--
  }
  item.isUp = !item.isUp
  const result = await addDiscussUpInfo(addDiscussUpReq)
  if (result.code == 0) {
    ElMessage.success('操作成功！')
  } else {
    ElMessage.error(result.message)
  }
}, 1000)

const reduceDiscussUpReq = reactive<any>({
  id: null,
  uid: null,
  flag: 'down'
})
const reduceDiscussUp = _.throttle(async (item: any) => {
  if (userStore.currentUser.userId == null) {
    ElMessage.warning('登录后才能点赞哟！')
    return;
  }
  reduceDiscussUpReq.id = item.id
  reduceDiscussUpReq.uid = userStore.currentUser.userId
  if (!item.isDown) {
    item.down++
  } else {
    item.down--
  }
  item.isDown = !item.isDown
  const result = await addDiscussUpInfo(reduceDiscussUpReq)
  if (result.code == 0) {
    ElMessage.success('操作成功！')
  } else {
    ElMessage.error(result.message)
  }
}, 1000)

const addDynamicUpReq = reactive<any>({
  id: null,
  uid: null
})
const addDynamicUp = _.throttle(async (item: any) => {
  if (userStore.currentUser.userId == null) {
    ElMessage.warning('登录后才能点赞哟！')
    return;
  }
  addDynamicUpReq.id = item.id
  addDynamicUpReq.uid = userStore.currentUser.userId
  if (!item.isUp) {
    item.up++
  } else {
    item.up--
  }
  item.isUp = !item.isUp
  const result = await addDynamicUpInfo(addDynamicUpReq)
  if (result.code == 0) {
    ElMessage.success('操作成功！')
  } else {
    ElMessage.error(result.message)
  }
}, 1000)

const getPostsData = () => {
  if (getPostsReq.title != null) {
    getPostsReq.content = getPostsReq.title
  }
  getDiscussData()
  getQuestionData()
  getDynamicData()
}
</script>

<style>
.discuss-main {
  margin-top: 30px;
}

.pagination {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}

.discuss-main .image {
  height: 60px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
  border-radius: 50%;
}

.origin-choose {
  margin-top: 55px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.discuss-main .content .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.discuss-main .content .text {
  font-size: 14px;
}

.discuss-main .content .item {
  margin-bottom: 18px;
}

.discuss-main .content .box-card {
  width: 120%;
  margin-top: 15px;
}

.discuss-main .content .box-card .notice {
  margin-top: 15px;
  color: #00000073;
}

.discuss-main .notice .box-card {
  margin-left: 30px;
  width: 450px;
  margin-top: 15px;
}

.discuss-main .content .box-card .message img {
  width: 15%;
  float: right;
  display: inline-block;
}

.discuss-main .content .box-card .message .text {
  display: block;
  flex: 1 1;
}

.discuss-main .content .box-card .message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  color: #000000d9;
}

.discuss-main .content .box-card .message a h5 {
  margin-bottom: 0.5em;
  color: #000000d9;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
}

.discuss-main .content .box-card .message a h5:hover {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color .3s;
}

.discuss-main .content .box-card .card-header img {
  height: 42px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
  border-radius: 50%;
}

.discuss-main .content .box-card .card-header {
  display: flex;
  flex: 1 1;
  align-items: flex-start;
  max-width: 100%;
}

.discuss-main .content .box-card .card-header a {
  flex: 1 0;
  width: 0;
  color: #000000d9;
  margin-top: 20px;
  cursor: pointer;
}

.discuss-main .content .box-card .card-header a:hover {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color .3s;
}

.discuss-main .content .box-card .card-header .tooltip-user img {
  height: 42px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
}
</style>
