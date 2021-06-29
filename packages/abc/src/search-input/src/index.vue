<template>
  <a-input :placeholder="placeholder" v-model:value="model" @keyup.enter="search">
    <template #suffix>
      <CloseOutlined v-if="model" @click="clear" />
      <SearchOutlined v-else @click="search" />
    </template>
  </a-input>
</template>

<script lang="ts">
import { useModel } from "@blazes/utils";
import { defineComponent } from "vue";
import SearchOutlined from "@ant-design/icons-vue/SearchOutlined";
import CloseOutlined from "@ant-design/icons-vue/CloseOutlined";

export default defineComponent({
  name: "search-input",
  components: {
    SearchOutlined,
    CloseOutlined,
  },
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: "请输入内容",
    },
  },
  setup(props, context) {
    const model = useModel<string>(props, context);

    const search = () => {
      context.emit("update:modelValue", model.value);
    };
    const clear = () => {
      model.value = "";
      search();
    };

    return { model, search, clear };
  },
});
</script>
