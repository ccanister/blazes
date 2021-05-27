import { Demo, Doc, DocMeta, File } from "./type";
const MarkIt = require("markdown-it");
import MetaDataBlock from "./meta-block";
import { parse } from "yaml";
import * as fs from "fs";
import _ from "underscore";

const template = _.template(`
<template>
    <doc :item="item">
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
            item: <%= item %>
        }
    }
});
</script>
`);

const meta: DocMeta = {} as DocMeta;

const md = MarkIt({
  html: true,
});

md.use(MetaDataBlock, {
  parseMetadata: parse,
  meta,
});

export function generateDoc(demos: Demo[], rootDir: string, file: File) {
  const source = fs.readFileSync(file.docPath, "utf8");
  const markData: string = md.render(source);
  const apiStartIndex = markData.match(/<h2>API<\/h2>/)?.index;
  const doc: Doc = ({
    ...meta,
    demo: demos.length > 0,
  } as unknown) as Doc;
  if (apiStartIndex > 0) {
    doc.content = markData.slice(0, apiStartIndex);
    doc.api = markData.slice(apiStartIndex);
  } else {
    doc.content = markData;
    _.com;
  }
  _.com;
  const fileContent = template({
    name: file.name,
    item: JSON.stringify(doc),
    demoComponents: demos.map((demo) => `<${demo.name} />`),
    demoComponentNames: demos.map((demo) => demo.name),
    importComponentNames: demos.map(
      (demo) => `import ${demo.name} from "./${demo.name}.vue";`
    ),
  });
  fs.writeFileSync(`${rootDir}/src/views/index.vue`, fileContent);
}
