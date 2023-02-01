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
            <el-form-item label="公司名称">
              <el-input v-model="getOriginReq.companyName"/>
            </el-form-item>
            <el-form-item label="公司职位">
              <el-input v-model="getOriginReq.companyPosition"/>
            </el-form-item>
            <el-form-item label="公司地点">
              <el-input v-model="getOriginReq.companyRegion"/>
            </el-form-item>
            <el-form-item label="公司薪资">
              <el-input v-model="getOriginReq.companySalary"/>
            </el-form-item>
            <el-form-item label="排序规则">
              <el-select v-model="getOriginReq.sortType" placeholder="排序规则" size="large">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button color="#d5ebe1" :icon="Search" round
                         @click="getOriginData">搜索
              </el-button>
              <el-button color="#d5ebe1" :icon="Plus" round
                         @click="getOriginData">发布内推
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
          <el-tooltip
              effect="light"
              :content="item?.userInfo"
              placement="right"
          >
            <template #content>
              <span style="font-size: 14px;">学院：{{ item.userInfo.collegeName }}</span><br/>
              <span style="font-size: 14px;margin-top: 5px">地区：{{ item.userInfo.regionName }}</span><br>
              <span style="font-size: 14px;margin-top: 5px">签名：{{ item.userInfo.userSign }}</span>
            </template>
            <img
                :src=item?.userInfo.userAvatar
                class="image"
            />
          </el-tooltip>
          <div style="padding: 14px">
            <h5 style="font-size: 16px">公司名：{{ item.companyName }}</h5><br>
            <span style="color: #00000073;">内推人：{{ item?.userInfo.userName }}</span><br>
            <span style="color: #00000073;">公司职位：{{ item.companyPosition }}</span><br>
            <span style="color: #00000073;">公司地址：{{ item.companyRegion }}</span><br>
            <span style="color: #00000073;">公司薪资：{{ item.companySalary }}</span><br>
            <span style="color: #00000073;">职位信息：{{ item.positionInfo }}</span><br>
            <span style="color: #00000073;">职位数量：{{ item.positionNum }}</span><br>
            <span style="color: #00000073;cursor: pointer;">内推地址：{{ item.pushUrl }}</span><br>
            <span style="color: #00000073;">发布时间：{{ item.createTime }}</span><br>
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

  </div>
</template>

<script lang="ts" setup>
import {getOriginInfo} from "../api/origin";
import {ref, reactive, onMounted} from "vue";
import {Search, House, Monitor,Plus} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import CollegeSelect from "../components/collegeSelect.vue";
import {addOriginUserInfo, getOriginUserInfo} from "../api/originUser";
import {getPushInfo} from "../api/push";

const options = [
  {
    value: null,
    label: '创建时间',
  },
  {
    value: 1,
    label: '公司薪水',
  }
]

onMounted(() => {
  getOriginData()
})
const getOriginReq = reactive<any>({
  pageNum: 1,
  pageSize: 20,
  uid: null,
  companyName: null,
  companyPosition: null,
  companyRegion: null,
  companySalary: null,
  isAudit: 1,
  sortType: null,
})
const pageTotal = ref(0);
const originData = ref<any>({})
const getOriginData = async () => {
  const result = await getPushInfo(getOriginReq)
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
