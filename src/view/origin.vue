<template>
  <div class="origin-choose">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form
              label-width="100px"
              :model="getOriginReq"
              style="max-width: 460px"
          >
            <el-form-item label="学院名称">
              <college-select @get-college-id="getCollegeId"/>
            </el-form-item>
            <el-form-item label="创建人名称">
              <el-input v-model="getOriginReq.userName"/>
            </el-form-item>
            <el-form-item label="组织名称">
              <el-input v-model="getOriginReq.originName"/>
            </el-form-item>
            <el-form-item>
              <el-button color="#d5ebe1" :icon="Search" round
                         @click="getOriginData">搜索
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <div class="origin-main" v-show="Object.keys(originData).length !== 0">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in originData" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <img
              :src=item.avatar
              class="image"
          />
          <div style="padding: 14px">
            <h5 style="font-size: 16px">组织名：{{ item.originName }}</h5><br>
            <span style="color: #00000073;">创建人：{{ item.userName }}</span><br>
            <span style="color: #00000073;">所属学院：{{ item.collegeName }}</span><br>
            <span style="color: #00000073;">创建时间：{{ item.createTime }}</span><br>
            <div style="margin-top: 5px">
              <el-button color="#d5ebe1" size="small" :icon="House" round @click="addOriginUser(item)">加入组织</el-button>
              <el-button color="#d5ebe1" size="small" :icon="Monitor" round @click="showOriginUser(item)">组织成员
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="pagination">
      <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="getOriginReq.pageNum"
          :page-size="getOriginReq.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
      ></el-pagination>
    </div>

    <el-drawer v-model="openOriginUserVisible" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">组织成员列表</h4>
      </template>
      <div style="overflow: auto" v-show="Object.keys(originUserData).length !== 0">
        <el-card :body-style="{ padding: '0px' }" v-for="(item,index) in originUserData" :key="index">
          <img
              :src=item.userInfo.userAvatar
              class="image"
          />
          <div style="padding: 14px">
            <h5 style="font-size: 16px">用户名：{{ item.userInfo.userName }}</h5><br>
            <span style="color: #00000073;">用户签名：{{ item.userInfo.userSign }}</span><br>
            <span style="color: #00000073;">所属学院：{{ item.userInfo.collegeName }}</span><br>
            <span style="color: #00000073;">加入时间：{{ item.userInfo.joinTime }}</span><br>
          </div>
        </el-card>
      </div>
      <el-empty v-show="Object.keys(originUserData).length === 0" :image-size="200"/>
    </el-drawer>
  </div>
  <el-empty v-show="Object.keys(originData).length === 0" :image-size="200"/>
</template>

<script lang="ts" setup>
import {getOriginInfo} from "../api/origin";
import {ref, reactive, onMounted} from "vue";
import {Search, House, Monitor} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import CollegeSelect from "../components/collegeSelect.vue";
import {addOriginUserInfo, getOriginUserInfo} from "../api/originUser";


onMounted(() => {
  getOriginData()
})
const getOriginReq = reactive<any>({
  pageNum: 1,
  pageSize: 20,
  collegeId: null,
  userName: null,
  originName: null,
})
const pageTotal = ref(0);
const originData = ref<any>({})
const getOriginData = async () => {
  const result = await getOriginInfo(getOriginReq)
  if (result.code == 0) {
    originData.value = {...result.data.items}
    pageTotal.value = result.data.total
  } else {
    ElMessage.error(result.message)
  }
}

// 分页导航
const handlePageChange = (val: number) => {
  getOriginReq.pageNum = val;
  getOriginData();
};

const getCollegeId = (id: number) => {
  getOriginReq.collegeId = id
}

//加入组织
const addOriginReq = reactive<any>({
  uid: null,
  oid: null
})
const addOriginUser = async (origin: any) => {
  addOriginReq.oid = origin.id
  const result = await addOriginUserInfo(addOriginReq)
  if (result.code == 0) {
    ElMessage.success('加入组织成功！')
  } else {
    ElMessage.error(result.message)
  }
}

const openOriginUserVisible = ref<boolean>(false)
const showOriginUser = (origin: any) => {
  openOriginUserVisible.value = true
  getOriginUser(origin.id)
}
const originUserData = ref<any>({})
const getOriginUserReq = reactive<any>({
  pageNum: 1,
  pageSize: 100,
  oid: null,
  userName: null,
  regionName: null
})
const getOriginUser = async (id: number) => {
  getOriginUserReq.oid = id
  const result = await getOriginUserInfo(getOriginUserReq)
  if (result.code == 0) {
    originUserData.value = {...result.data.items}
  }
}
</script>

<style>
.origin-main {
  margin-top: 30px;
}

.origin-main .pagination {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}

.origin-main .image {
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
</style>
