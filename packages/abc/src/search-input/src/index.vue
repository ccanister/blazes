<template>
  <a-input
    class="search-input"
    :placeholder="placeholder"
    v-model:value="model"
    @pressEnter="change"
    :style="{ width: width + 'px' }"
  >
    <template #suffix>
      <SearchOutlined class="pointer" @click="change" />
    </template>
  </a-input>
</template>

<script lang="ts">
import { useModel } from "@blazes/utils";
import { defineComponent } from "vue";
import { number, string } from "vue-types";
import SearchOutlined from "@ant-design/icons-vue/SearchOutlined";

export default defineComponent({
  name: "search-input",
  props: {
    modelValue: string(),
    placeholder: string().def("请输入搜索"),
    width: number().def(360),
  },
  components: {
    SearchOutlined,
  },
  emits: {
    "update:modelValue": null,
    change: null,
  },
  setup(props, context) {
    const model = useModel(props, context);

    const change = () => {
      context.emit("change");
    };

    return { model, change };
  },
});
</script>

<style scoped lang="less">
.search-input {
  border-radius: 15px;
}
</style>
