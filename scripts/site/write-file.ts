const _ = require("underscore");
import { Doc, Demo, File, Lib, MenuItem, ModuleConfig } from "./type";
import { toHump, viewDir, writeFileRecursive } from "./util";

const metaTemplate = _.template(`
export const meta = <%= meta %>;
`);

const fileTemplate = _.template(`
<template>
    <doc :item="item" :anchors="anchors">
        <%= demoComponents %>
    </doc>
</template>
<script lang="ts">
import { defineComponent } from "vue";
<%= importComponentNames %>

export default defineComponent({
    name: "<%= name %>",
    components: {
        <%= demoComponentNames %>
    },
    setup() {
        return {
            item: <%= item %>,
            anchors: <%= anchors %>,
        }
    }
});
</script>
`);

export function writeDoc(doc: Doc, demos: Demo[], config: ModuleConfig) {
  if (doc.lib) {
    return;
  }
  const anchors = demos
    .map((demo) => ({ label: demo.title, value: demo.subtitle }))
    .concat(doc.api ? { label: "Api", value: "Api" } : []);

  const fileContent = fileTemplate({
    name: doc.title,
    item: JSON.stringify(doc),
    demoComponents: demos
      .map((demo) => `<${demo.name} id="${demo.name}" />`)
      .join("\n"),
    demoComponentNames: demos.map((demo) => toHump(demo.name)),
    importComponentNames: demos
      .map((demo) => `import ${toHump(demo.name)} from "./${demo.name}.vue";`)
      .join("\n"),
    anchors: JSON.stringify(anchors),
  });
  const folderName = `${viewDir}${config.name}/${
    doc.subtitle ? doc.title : doc.filename
  }`;
  writeFileRecursive(`${folderName}/index.vue`, fileContent);

  demos.forEach((demo) => {
    const { name, fileContent } = demo;
    writeFileRecursive(`${folderName}/${name}.vue`, fileContent);
  });
}

export function generateMenu(files: File[], config: ModuleConfig) {
  const menus: { [key: string]: MenuItem } = {};
  files.forEach((file) => {
    const { type, title, subtitle, order, redirect } = file.doc!;
    const menuItem: MenuItem =
      menus[type] || (menus[type] = { type, subs: [] });
    menuItem.subs.push({
      title,
      subtitle,
      path: `/${config.name}/${file.name}`,
      order,
      redirect,
    });
  });
  Object.keys(menus).forEach((type) => {
    menus[type].subs.sort((s1, s2) => s1.order - s2.order);
  });
  const menu = {
    name: config.name,
    items: Object.values(menus).sort(
      (menu1, menu2) => menu1.subs[0].order - menu2.subs[0].order
    ),
    defaultRoute: config.defaultRoute || false,
  };
  writeFileRecursive(
    `${viewDir}${config.name}/meta.ts`,
    metaTemplate({ meta: JSON.stringify(menu) })
  );
}

export function writeLibMeta(libs: Lib[]) {
  writeFileRecursive(
    `${viewDir}meta.ts`,
    metaTemplate({ meta: JSON.stringify(libs) })
  );
}
