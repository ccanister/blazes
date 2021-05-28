import { Demo, Doc, DocMeta, File, ModuleConfig } from "./type";
const MarkIt = require("markdown-it");
import MetaDataBlock from "./meta-block";
import { parse } from "yaml";
import * as fs from "fs";
import { writeFileRecursive } from "./util";
const _ = require("underscore");

const template = _.template(`
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

let meta: DocMeta = {} as DocMeta;

const md = MarkIt({
  html: true,
});

md.use(MetaDataBlock, {
  parseMetadata: parse,
  meta,
});

export function generateDoc(
  demos: Demo[],
  rootDir: string,
  file: File,
  config: ModuleConfig
) {
  const source = fs.readFileSync(file.docPath, "utf8");
  const markData: string = md.render(source);
  const apiStartIndex = markData.match(/<h2>API<\/h2>/)?.index;
  const hasDemo = demos.length > 0;
  const doc: Doc = {
    ...meta,
    demo: hasDemo,
  } as Doc;
  if (apiStartIndex > 0) {
    doc.content = markData.slice(0, apiStartIndex);
    doc.api = markData.slice(apiStartIndex);
  } else {
    doc.content = markData;
  }
  let anchors = [];
  if (hasDemo) {
    anchors = demos
      .map((demo) => ({ label: demo.title, value: demo.subtitle }))
      .concat({ label: "Api", value: "Api" });
  }
  const fileContent = template({
    name: file.name,
    item: JSON.stringify(doc),
    demoComponents: demos.map((demo) => `<${demo.name} id="${demo.name}" />`),
    demoComponentNames: demos.map((demo) => demo.name),
    importComponentNames: demos.map(
      (demo) => `import ${demo.name} from "./${demo.name}.vue";`
    ),
    anchors: JSON.stringify(anchors),
  });

  writeFileRecursive(
    `${rootDir}/src/views/${config.name}/${file.name}/index.vue`,
    fileContent
  );
  clearMeta();

  return doc;
}

function clearMeta() {
  Object.keys(meta).forEach((key) => {
    meta[key] = "";
  });
}
