<template>
  <div class="origin-choose">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="advertising">
          <el-card>
            <template #header>
              <span style="color: rgba(0,0,0,.85);font-weight: 500;font-size: 16px;">合作+Q：2722933638</span>
            </template>
            <span>专属广告地</span>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="content">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <img :src="discussInfo.userInfo?.userAvatar">
                <el-tooltip placement="bottom-start" effect="light">
                  <template #content>
                    <span style="font-size: 14px;">学院：{{ discussInfo.userInfo?.collegeName }}</span><br/>
                    <span style="font-size: 14px;margin-top: 5px">地区：{{ discussInfo.userInfo?.regionName }}</span><br>
                    <span style="font-size: 14px;margin-top: 5px">签名：{{ discussInfo.userInfo?.userSign }}</span>
                  </template>
                  <a>{{ discussInfo.userInfo?.userName }}</a>
                </el-tooltip>
              </div>
            </template>
            <div class="message">
              <div class="text">
                <a>
                  <h5>{{ discussInfo.title }}</h5>
                </a>
                <v-md-preview :text="discussInfo.message"></v-md-preview>
                <el-tag type="success" round>{{ discussInfo.tagName }}</el-tag>
                <div style="margin-top: 12px;">
                  <span style="color: #00000073;">{{ discussInfo.createTime }}</span>
                  <el-divider direction="vertical"/>
                  <span style="cursor: pointer" @click="addDiscussUp(discussInfo)">
                  <i class="iconfont icon-dianzan" v-if="!discussInfo.isUp"></i>
                  <i class="iconfont icon-dianzan1" v-else></i>
                  &nbsp;{{ discussInfo.up }}
                </span>
                  <el-divider direction="vertical"/>
                  <span style="cursor: pointer" @click="reduceDiscussUp(discussInfo)">
                  <i class="iconfont icon-cai" v-if="!discussInfo.isDown"></i>
                  <i class="iconfont icon-cai1" v-else></i>
                  &nbsp;{{ discussInfo.down }}
                </span>
                </div>
              </div>
              <img :src="discussInfo.cover"/>
            </div>
          </el-card>
          <el-card class="comment">
            <div class="header">
              <div class="comment-header">
                共{{ commentInfo?.total != null ? commentInfo?.total : 0 }}条评论
              </div>
              <div class="comment-sort">
                <el-switch
                    v-model="sortTimeOrUp"
                    class="mb-2"
                    active-text="创建时间排序"
                    inactive-text="点赞排序"
                    @change="changeSortComment"
                />
              </div>
            </div>
            <el-divider/>
            <div>
              <content @show-message="showMessage"/>
            </div>
            <el-button color="#d5ebe1" :icon="Edit" round
                       style="margin-top: 15px;text-align: center"
                       @click="addDiscussCommentDo">发布评论
            </el-button>
            <div class="comment-info" v-for="(item,index) in commentInfo?.items" :key="index">
              <div class="card-header">
                <img :src="item.userInfo?.userAvatar">
                <el-tooltip placement="bottom-start" effect="light">
                  <template #content>
                    <span style="font-size: 14px;">学院：{{ item.userInfo?.collegeName }}</span><br/>
                    <span style="font-size: 14px;margin-top: 5px">地区：{{ item.userInfo?.regionName }}</span><br>
                    <span style="font-size: 14px;margin-top: 5px">签名：{{ item.userInfo?.userSign }}</span>
                  </template>
                  <a>{{ item.userInfo?.userName }}</a>
                </el-tooltip>
              </div>
              <div class="comment-main">
                <span>{{ item?.content }}</span><br>
                <span style="color: #00000073;margin-top: 15px">{{ item?.createTime }}</span>
                <el-divider direction="vertical"/>
                <span style="cursor: pointer" @click="doCommentUp(item)">
                  <i class="iconfont icon-dianzan" v-if="!item.isUp"></i>
                <i class="iconfont icon-dianzan1" v-else></i>
                &nbsp;{{ item?.up }}
                </span>
                <el-divider direction="vertical"/>
                <span style="cursor: pointer" @click="addReply">回复</span>
                <div class="reply-input" v-show="isShowReplyInput">
                  <el-input
                      v-model="replyContent"
                      :rows="2"
                      type="textarea"
                      :placeholder="`@${item.userInfo?.userName}`"/>
                  <el-button color="#d5ebe1" :icon="Edit" round style="margin-top: 5px" @click="doReply(item)">回复
                  </el-button>
                </div>
              </div>
              <div class="reply-main" v-show="item?.replyInfo?.length!=0" v-for="(info,index) in item?.replyInfo"
                   :key="index">
                <div class="card-header">
                  <img :src="info.replyUserInfo?.userAvatar">
                  <el-tooltip placement="bottom-start" effect="light">
                    <template #content>
                      <span style="font-size: 14px;">学院：{{ info.replyUserInfo?.collegeName }}</span><br/>
                      <span style="font-size: 14px;margin-top: 5px">地区：{{ info.replyUserInfo?.regionName }}</span><br>
                      <span style="font-size: 14px;margin-top: 5px">签名：{{ info.replyUserInfo?.userSign }}</span>
                    </template>
                    <a>{{ info.replyUserInfo?.userName }}</a>
                  </el-tooltip>
                </div>
                <div class="comment-main">
                  <span>{{ info?.replyContent }}</span><br>
                  <span style="color: #00000073;margin-top: 15px">{{ info?.createTime }}</span>
                  <el-divider direction="vertical"/>
                  <span style="cursor: pointer" @click="doReplyUp(info)">
                  <i class="iconfont icon-dianzan" v-if="!info.isUp"></i>
                <i class="iconfont icon-dianzan1" v-else></i>
                &nbsp;{{ info?.up }}
                </span>
                  <el-divider direction="vertical"/>
                </div>
              </div>
              <el-divider/>
            </div>
            <div class="pagination">
              <el-pagination
                  background
                  layout="total, prev, pager, next"
                  :current-page="doDiscussCommentReq.pageNum"
                  :page-size="doDiscussCommentReq.pageSize"
                  :total="commentInfo?.total"
                  @current-change="handlePageChange"
              ></el-pagination>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="4">
        <el-card>
          <template #header>
            <span style="color: rgba(0,0,0,.85);font-weight: 500;font-size: 16px;">帖子信息</span>
          </template>
          <span>标签：</span>
          <el-tag type="success">{{ discussInfo?.tagName }}</el-tag>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {addDiscussUpInfo, getDiscussInfoById} from "../api/discuss";
import {ElMessage} from "element-plus";
import _ from "lodash";
import {Edit} from '@element-plus/icons-vue'
import Content from "../components/content.vue";
import {addDiscussComment, doDiscussCommentUp, getDiscussComment} from "../api/comment";
import {addDiscussCommentReply, doDiscussCommentReplyUp} from "../api/reply";
import {useUserStore} from "../stores/user";

const userStore = useUserStore()
userStore.getUserInfo()

const {params: {id}} = useRoute()
onMounted(() => {
  if (typeof id === "string") {
    getDiscussInfo(parseInt(id))
    DoDiscussComment(parseInt(id))
  }
})
const discussInfo = ref<any>({})
const getDiscussInfo = async (id: number) => {
  const result = await getDiscussInfoById(id)
  if (result.code == 0) {
    discussInfo.value = {...result.data}
  } else {
    ElMessage.error('系统错误！')
  }
}

const addDiscussUpReq = reactive<any>({
  id: null,
  uid: null,
  flag: 'up'
})
const addDiscussUp = _.throttle(async (item: any) => {
  if (userStore.currentUser.userId == null) {
    ElMessage.warning('登录后才能加入点赞哟！')
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
  flag: 'up'
})
const reduceDiscussUp = _.throttle(async (item: any) => {
  if (userStore.currentUser.userId == null) {
    ElMessage.warning('登录后才能加入点赞哟！')
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


const sortTimeOrUp = ref<boolean>(true)
const comment = ref<string>('')
const showMessage = (text: string) => {
  comment.value = text
}
const addCommentReq = reactive<any>({
  uid: 7,
  did: null,
  content: null
})
const addDiscussCommentDo = async () => {
  if (userStore.currentUser.userId == null) {
    ElMessage.warning('登录后才能发布评论哟！')
    return;
  }
  if (typeof id === "string") {
    addCommentReq.did = parseInt(id)
  }
  addCommentReq.uid = userStore.currentUser.userId
  addCommentReq.content = comment.value
  const result = await addDiscussComment(addCommentReq)
  if (result.code == 0) {
    comment.value = ''
    if (typeof id === "string") {
      await DoDiscussComment(parseInt(id))
    }
    ElMessage.success('评论成功')
  } else {
    ElMessage.error(result.message)
  }
}

const doDiscussCommentReq = reactive<any>({
  pageNum: 1,
  pageSize: 10,
  did: null,
  orderType: null
})
const commentInfo = ref<any>()
const DoDiscussComment = async (id: number) => {
  doDiscussCommentReq.did = id
  if (sortTimeOrUp.value) {
    doDiscussCommentReq.orderType = 1
  } else {
    doDiscussCommentReq.orderType = 2
  }
  const result = await getDiscussComment(doDiscussCommentReq)
  if (result.code == 0) {
    commentInfo.value = {...result.data}
  }
}

const addCommentUpReq = reactive<any>({})
const doCommentUp = _.throttle(async (item: any) => {
  if (userStore.currentUser.userId == null) {
    ElMessage.warning('登录后才能发布点赞哟！')
    return;
  }
  addCommentUpReq.id = item.id
  addCommentUpReq.uid = userStore.currentUser.userId
  if (!item.isUp) {
    item.up++
  } else {
    item.up--
  }
  item.isUp = !item.isUp
  const result = await doDiscussCommentUp(addCommentUpReq)
  if (result.code == 0) {
    ElMessage.success('操作成功！')
  } else {
    ElMessage.error(result.message)
  }
}, 1000)

const addReplyUpReq = reactive<any>({})
const doReplyUp = _.throttle(async (item: any) => {
  if (userStore.currentUser.userId == null) {
    ElMessage.warning('登录后才能发布点赞哟！')
    return;
  }
  addReplyUpReq.id = item.id
  addReplyUpReq.uid = userStore.currentUser.userId
  if (!item.isUp) {
    item.up++
  } else {
    item.up--
  }
  item.isUp = !item.isUp
  const result = await doDiscussCommentReplyUp(addReplyUpReq)
  if (result.code == 0) {
    ElMessage.success('操作成功！')
  } else {
    ElMessage.error(result.message)
  }
}, 1000)

const isShowReplyInput = ref<boolean>(false)
const addReply = () => {
  isShowReplyInput.value = true
}
const replyContent = ref<string>('')
const addReplyReq = reactive<any>({
  uid: null,
  cid: null,
  replyId: 7,
  replyContent: null
})
const doReply = async (item: any) => {
  if (userStore.currentUser.userId == null) {
    ElMessage.warning('登录后才能加入回复哟！')
    return;
  }
  addReplyReq.cid = item.id
  addReplyReq.uid = item.uid
  addReplyReq.replyContent = replyContent

  const result = await addDiscussCommentReply(addReplyReq)
  if (result.code == 0) {
    if (typeof id === "string") {
      await DoDiscussComment(parseInt(id))
    }
    isShowReplyInput.value = false
    replyContent.value = ''
    ElMessage.success('回复成功！')
  } else {
    ElMessage.error(result.message)
  }
}

// 分页导航
const handlePageChange = (val: number) => {
  doDiscussCommentReq.pageNum = val;
  if (typeof id === "string") {
    DoDiscussComment(parseInt(id))
  }
};

const changeSortComment = () => {
  if (typeof id === "string") {
    DoDiscussComment(parseInt(id))
  }
}
</script>

<style scoped>
.origin-choose {
  margin-top: 55px;
}

.origin-choose .content .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.origin-choose .content .text {
  font-size: 14px;
}

.origin-choose .content .item {
  margin-bottom: 18px;
}

.origin-choose .content .box-card {
  width: 980px;
  margin-top: 15px;
}

.origin-choose .content .box-card .notice {
  margin-top: 15px;
  color: #00000073;
}

.origin-choose .notice .box-card {
  margin-left: 30px;
  width: 450px;
  margin-top: 15px;
}

.origin-choose .content .box-card .message img {
  width: 15%;
  float: right;
  display: inline-block;
}

.origin-choose .content .box-card .message .text {
  display: block;
  flex: 1 1;
}

.origin-choose .content .box-card .message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  color: #000000d9;
}

.origin-choose .content .box-card .message a h5 {
  margin-bottom: 0.5em;
  color: #000000d9;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
}

.origin-choose .content .box-card .message a h5:hover {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color .3s;
}

.origin-choose .content .box-card .card-header img {
  height: 42px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
  border-radius: 50%;
}

.origin-choose .content .box-card .card-header {
  display: flex;
  flex: 1 1;
  align-items: flex-start;
  max-width: 100%;
}

.origin-choose .content .box-card .card-header a {
  flex: 1 0;
  width: 0;
  color: #000000d9;
  margin-top: 20px;
  cursor: pointer;
}

.origin-choose .content .box-card .card-header a:hover {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color .3s;
}

.origin-choose .content .box-card .card-header .tooltip-user img {
  height: 42px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
}

.origin-choose .content .comment {
  margin-top: 20px;
}

.origin-choose .content .comment .pagination {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}

.origin-choose .content .comment .header .comment-header {
  color: rgba(0, 0, 0, .85);
  font-weight: 500;
  font-size: 16px
}

.origin-choose .content .comment .header {
  display: flex;
  flex: 1 1;
  align-items: flex-start;
  max-width: 100%;
}

.origin-choose .content .comment .header .comment-sort {
  margin-left: auto;
  padding: 16px 0;
  color: rgba(0, 0, 0, .85);
  font-weight: 400;
  font-size: 14px;
}

.origin-choose .content .comment .comment-info {
  margin-top: 15px;
}

.origin-choose .content .comment .comment-info .card-header img {
  height: 42px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
  border-radius: 50%;
}

.origin-choose .content .comment .comment-info .card-header {
  display: flex;
  flex: 1 1;
  align-items: flex-start;
  max-width: 100%;
}

.origin-choose .content .comment .comment-info .card-header a {
  flex: 1 0;
  width: 0;
  color: #000000d9;
  margin-top: 20px;
  cursor: pointer;
}

.origin-choose .content .comment .comment-info .card-header a:hover {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color .3s;
}

.origin-choose .content .comment .comment-info .card-header .tooltip-user img {
  height: 42px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
}

.origin-choose .content .comment .comment-info .comment-main {
  margin-top: 15px;
}

.origin-choose .content .comment .comment-info .comment-main .reply-input {
  margin-top: 15px;
  width: 50%;
}

.origin-choose .content .comment .comment-info .reply-main {
  margin-top: 15px;
  margin-left: 20px;
}

.origin-choose .content .comment .comment-info .reply-main .card-header img {
  height: 42px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
  border-radius: 50%;
}

.origin-choose .content .comment .comment-info .reply-main .card-header {
  display: flex;
  flex: 1 1;
  align-items: flex-start;
  max-width: 100%;
}

.origin-choose .content .comment .comment-info .reply-main .card-header a {
  flex: 1 0;
  width: 0;
  color: #000000d9;
  margin-top: 20px;
  cursor: pointer;
}

.origin-choose .content .comment .comment-info .reply-main .card-header a:hover {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color .3s;
}

.origin-choose .content .comment .comment-info .reply-main .tooltip-user img {
  height: 42px;
  float: right;
  margin-top: 12px;
  margin-right: 12px;
}

.origin-choose .content .comment .comment-info .reply-main .comment-main {
  margin-top: 15px;
}
</style>
