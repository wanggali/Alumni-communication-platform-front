<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title"> 🌎 校友交流平台 🌍</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="email">
          <el-input v-model="param.email" clearable placeholder="请输入邮箱">
            <template #prepend>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              clearable
              placeholder="请输入密码"
              v-model="param.password"
              @keyup.enter="submitForm(login)"
          >
            <template #prepend>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <div style="display: flex;">
            <el-button color="#d5ebe1" :icon="Coordinate" round @click="submitForm(login)">登录</el-button>
            <el-button color="#d5ebe1" :icon="Coordinate" round @click="$router.push('/register')">注册</el-button>
          </div>
        </div>
        <p class="login-tips">Tips : 欢迎来到校友交流平台！</p>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import type {FormInstance, FormRules} from 'element-plus';
import {ElMessage,} from 'element-plus';
import {userLogin} from "../api/user";
import {Coordinate} from '@element-plus/icons-vue'

interface LoginInfo {
  email: string;
  password: string;
}

const router = useRouter();
const param = reactive<LoginInfo>({});

const rules: FormRules = {
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    }
  ],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}]
};
const login = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      const result = await userLogin(param)
      if (result.code == 0) {
        ElMessage.success('登录成功');
        localStorage.setItem('acp_token', result.data);
        await router.push('/')
        setTimeout(()=>{
          location.reload()
        },10)
      } else {
        ElMessage.error('邮箱/密码输入错误');
        return false;
      }
    } else {
      ElMessage.error('校验失败');
      return false;
    }
  });
};
</script>

<style scoped>
.login-wrap {
  margin-top: 45px;
  width: 100%;
  height: 570px;
  background-color: #74EBD5;
  background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 25px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  font-size: 20px;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 15px;
  line-height: 30px;
  color: #fff;
}

</style>
