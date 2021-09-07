<template>
  <span>{{ property.value || ui.defaultText || "-" }}</span>
</template>

<script lang="ts">
import { AtomicProperty } from "@blazes/abc/lib/sf";
import { ISFUISchemaItem } from "@blazes/abc/lib/sf/src/type";
import { defineComponent } from "vue";
import { object } from "vue-types";

export default defineComponent({
  name: "sf-input",
  props: {
    property: object<AtomicProperty>().isRequired,
    ui: object<ISFUISchemaItem>().isRequired,
  },
});
</script>
