<template>
  <a-row class="header-wrapper">
    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="4" :xxl="5">
      <h1>
        <router-link to="/">
          <img src="../assets/images/logo.ico" alt="vue-alian" />
          VUE-ALIAN
        </router-link>
      </h1>
    </a-col>
    <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="20" :xxl="19">
      <ul>
        <li>
          <router-link active-class="active" to="/docs" exact>
            文档
          </router-link>
        </li>
        <li>
          <router-link active-class="active" to="/component" >
            组件
          </router-link>
        </li>
        <li>
          <router-link active-class="active" to="/blazes" >
            blazes库
          </router-link>
        </li>
        
      </ul>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less"></style>
