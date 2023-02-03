<template>
  <BaseLayout/>
</template>

<script lang="ts" setup>
import BaseLayout from "./layout/BaseLayout.vue";
import Login from "./view/login.vue";
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";
import Register from "./view/register.vue";

</script>

<style>
@import './assets/css/main.css';
</style>
