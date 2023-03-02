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
                </div>
              </div>
              <img :src="discussInfo.cover"/>
            </div>
          </el-card>
          <el-card class="comment">
            <div class="header">
              <div class="comment-header">
                共{{ commentInfo?.total }}条评论
              </div>
              <div class="comment-sort">
                <el-switch
                    v-model="sortTimeOrUp"
                    class="mb-2"
                    active-text="全部回答"
                    inactive-text="已采纳回答"
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
                       @click="addDiscussCommentDo">发布回答
            </el-button>
            <div class="comment-info" v-for="(item,index) in commentInfo?.items" :key="index">
              <div class="card-header">
                <img :src="item.answerUserInfo?.userAvatar">
                <el-tooltip placement="bottom-start" effect="light">
                  <template #content>
                    <span style="font-size: 14px;">学院：{{ item.answerUserInfo?.collegeName }}</span><br/>
                    <span style="font-size: 14px;margin-top: 5px">地区：{{ item.answerUserInfo?.regionName }}</span><br>
                    <span style="font-size: 14px;margin-top: 5px">签名：{{ item.answerUserInfo?.userSign }}</span>
                  </template>
                  <a>{{ item.answerUserInfo?.userName }}</a>
                </el-tooltip>
              </div>
              <div class="comment-main">
                <span>{{ item?.answerContent }}</span><br>
                <span style="color: #00000073;margin-top: 15px">{{ item?.createTime }}</span>
                <el-divider direction="vertical"/>
                <el-button color="#d5ebe1" :icon="Check" round
                           v-show="userStore?.currentUser.userId===discussInfo.uid"
                           @click="updateAnswer(item)">{{ item.isAdopt === 1 ? '取消采纳' : '采纳' }}
                </el-button>
                <el-tag type="success" style="margin-left: 850px" v-show="item.isAdopt===1">已采纳</el-tag>
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
import {Edit, Check} from '@element-plus/icons-vue'
import Content from "../components/content.vue";
import {addDiscussComment, doDiscussCommentUp, getDiscussComment} from "../api/comment";
import {addDiscussCommentReply, doDiscussCommentReplyUp} from "../api/reply";
import {getQuestionInfoById} from "../api/question";
import {addAnswerInfo, getAnswerInfo, updateAnswerInfo} from "../api/answer";
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
  const result = await getQuestionInfoById(id)
  if (result.code == 0) {
    discussInfo.value = {...result.data}
  } else {
    ElMessage.error('系统错误！')
  }
}

const sortTimeOrUp = ref<boolean>(true)
const comment = ref<string>('')
const showMessage = (text: string) => {
  comment.value = text
}
const addCommentReq = reactive<any>({
  uid: null,
  qid: null,
  answerId: null,
  answerContent: null
})
const addDiscussCommentDo = async () => {
  if (userStore.currentUser.userId == null) {
    ElMessage.warning('登录后才能回答哟！')
    return;
  }
  if (typeof id === "string") {
    addCommentReq.qid = parseInt(id)
  }
  addCommentReq.answerContent = comment.value
  addCommentReq.uid = discussInfo.value.uid
  addCommentReq.answerId = userStore.currentUser.userId
  const result = await addAnswerInfo(addCommentReq)
  if (result.code == 0) {
    ElMessage.success('回答成功')
    comment.value = ''
    if (typeof id === "string") {
      await DoDiscussComment(parseInt(id))
    }
  } else {
    ElMessage.error(result.message)
  }
}

const doDiscussCommentReq = reactive<any>({
  pageNum: 1,
  pageSize: 10,
  qid: null,
  adoptType: null
})
const commentInfo = ref<any>()
const DoDiscussComment = async (id: number) => {
  doDiscussCommentReq.qid = id
  if (sortTimeOrUp.value) {
    doDiscussCommentReq.adoptType = null
  } else {
    doDiscussCommentReq.adoptType = 1
  }
  const result = await getAnswerInfo(doDiscussCommentReq)
  if (result.code == 0) {
    commentInfo.value = {...result.data}
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

const updateAnswerReq = reactive<any>({
  id: null,
  isAdopt: null
})
const updateAnswer = async (item: any) => {
  if (item.isAdopt === 0) {
    updateAnswerReq.isAdopt = 1
  } else {
    updateAnswerReq.isAdopt = 0
  }
  updateAnswerReq.id = item.id
  const result = await updateAnswerInfo(updateAnswerReq)
  if (result.code == 0) {
    if (typeof id === "string") {
      await DoDiscussComment(parseInt(id))
    }
    ElMessage.success('操作成功！')
  } else {
    ElMessage.error(result.message)
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
