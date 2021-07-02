const source = `
<template>
  <div id="app">
    <Child />
  </div>
</template>

<script lang="ts">
import Child from "./child.vue";
export default {
  name: "App",
  components: { Child },
  setup() {
    const a: number = 1;
    console.log(a);
  },
};
</script>
`;

export default source;
