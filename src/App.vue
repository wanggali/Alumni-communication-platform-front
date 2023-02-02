<template>
  <BaseLayout v-if="path!=='/login'"/>
  <login v-if="path==='/login'"/>
  <register v-else/>
</template>

<script lang="ts" setup>
import BaseLayout from "./layout/BaseLayout.vue";
import Login from "./view/login.vue";
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";
import Register from "./view/register.vue";

const route = useRoute();
const router = useRouter();
const path=ref<string>()
watch(route,(newValue,oldValue)=>{
  path.value=route.path
})
</script>

<style>
@import './assets/css/main.css';
</style>
