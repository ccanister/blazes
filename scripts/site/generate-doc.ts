import { Demo, Doc, DocMeta, File, ModuleConfig } from "./type";
const MarkIt = require("markdown-it");
import MetaDataBlock from "./meta-block";
import { parse } from "yaml";
import * as fs from "fs";
import { toHump, writeFileRecursive } from "./util";
const _ = require("underscore");
const MarkdownItSize = require("markdown-it-imsize");

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

const meta: DocMeta = {} as DocMeta;

const md = MarkIt({
  html: true,
  linkify: true,
  typography: true,
});

md.use(MetaDataBlock, {
  parseMetadata: parse,
  meta,
});

md.use(MarkdownItSize);

export function generateDoc(file: File) {
  const source = fs.readFileSync(file.docPath, "utf8");
  const markData: string = md.render(source);
  if (meta.lib) {
    return;
  }
  const apiStartIndex = markData.match(/<h2>API<\/h2>/)?.index;
  const doc: Doc = {
    ...meta,
  } as Doc;
  if (apiStartIndex > 0) {
    doc.content = markData.slice(0, apiStartIndex);
    doc.api = markData.slice(apiStartIndex);
  } else {
    doc.content = markData;
  }

  clearMeta();

  return doc;
}

export function writeDoc(
  doc: Doc,
  demos: Demo[],
  rootDir: string,
  config: ModuleConfig
) {
  if (doc.lib) {
    return;
  }
  const anchors = demos
    .map((demo) => ({ label: demo.title, value: demo.subtitle }))
    .concat({ label: "Api", value: "Api" });

  const fileContent = template({
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

  writeFileRecursive(
    `${rootDir}/src/views/${config.name}/${doc.title}/index.vue`,
    fileContent
  );
}

function clearMeta() {
  Object.keys(meta).forEach((key) => {
    meta[key] = "";
  });
}
