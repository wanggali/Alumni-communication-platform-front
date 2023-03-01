<template>
  <div style="margin-top: 45px">
    <el-steps :space="200" :active="active" simple>
      <el-step title="问题内容" :icon="Edit"/>
      <el-step title="问题信息" :icon="Edit"/>
      <el-step title="发布问题" :icon="UploadFilled"/>
    </el-steps>

    <Content @show-message="showMessage" style="height: 300px"/>

    <div class="discuss-info">
      <el-form
          label-width="100px"
          :model="addDiscuss"
          style="max-width: 460px"
          class="el-form"
      >
        <el-form-item label="标题名" placeholder="标题名">
          <el-input v-model="addDiscuss.title"/>
        </el-form-item>
        <el-form-item label="标签名">
          <tag @get-tag-id="getTagId"/>
        </el-form-item>
        <el-form-item>
				<span>
					<el-button type="primary" @click="saveEdit">发 布</el-button>
				</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch, reactive} from "vue";
import {useRouter} from "vue-router";
import Content from "../components/content.vue";
import {ElMessage, UploadUserFile} from "element-plus";
import Tag from "../components/tag.vue";
import UploadAliyun from "../components/uploadAliyun.vue";
import {addDiscussInfo} from "../api/discuss";
import {addQuestionInfo} from "../api/question";
import {useUserStore} from "../stores/user";

const userStore = useUserStore()
userStore.getUserInfo()

const router = useRouter()
const active = ref<number>(1)
const message = ref<string>('')

const showMessage = (text: string) => {
  addDiscuss.content = text
}

watch(message, (val) => {
  if (val != '') {
    active.value = 2
  } else {
    active.value = 1
  }
})

const addDiscuss = reactive<any>({})
const getTagId = (id: bigint) => {
  addDiscuss.tid = id
}
/**
 * 发布帖子
 */
const saveEdit = async () => {
  addDiscuss.uid = userStore.currentUser?.userId
  if (addDiscuss.uid == null) {
    ElMessage.warning("登录后才能发布问题")
    return
  }
  if (addDiscuss.title == null ||
      addDiscuss.title?.length > 30 ||
      addDiscuss.content == null ||
      addDiscuss.content?.length < 5 ||
      addDiscuss.tid == null) {
    ElMessage.warning("提出的问题中有信息错误！")
    return
  }
  const result = await addQuestionInfo(addDiscuss);
  if (result.code == 0) {
    ElMessage.success("发布问题成功，待管理员审核后查看")
    await router.push('/posts')
  } else {
    ElMessage.error(result.message)
  }
}
</script>

<style scoped>
.discuss-info {
  margin-top: 30px;
  background: white;
  border-radius: 4px;
  height: 100%;
}

.el-form {
  position: relative;
  top: 70px;
  left: 300px;
}
</style>
