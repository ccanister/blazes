import { Demo, Doc, DocMeta, File, ModuleConfig } from "./type";
const MarkIt = require("markdown-it");
import MetaDataBlock from "./meta-block";
import { parse } from "yaml";
import * as fs from "fs";
import * as path from "path";
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
  const apiStartIndex = markData.match(/<h2>API<\/h2>/)?.index;
  const doc: Doc = {
    ...meta,
    filename: path.basename(file.docPath, ".md"),
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

function clearMeta() {
  Object.keys(meta).forEach((key) => {
    meta[key] = "";
  });
}
