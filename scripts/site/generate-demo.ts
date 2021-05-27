import * as path from "path";
import * as fs from "fs";
const MarkIt = require("markdown-it");
import MetaDataBlock from "./meta-block";
import { parse } from "yaml";
import { Demo } from "./type";
import { html2Escape } from "./util";
const klawSync = require("klaw-sync");
const hljs = require("highlight.js");

const highlight = (str, lang) => {
  if (!lang || !hljs.getLanguage(lang)) {
    return '<pre><code class="hljs">' + str + "</code></pre>";
  }
  const html = hljs.highlight(lang, str, true, undefined).value;
  return `<pre><code class="hljs language-${lang}">${html}</code></pre>`;
};

const md = MarkIt({
  html: true,
  highlight,
});

const meta: { title: string; order: number } = {} as any;
md.use(MetaDataBlock, {
  parseMetadata: parse,
  meta,
});
let code = "",
  name: "",
  writeFileCode = "";

const defaultFenceRender = md.renderer.rules.fence;
const templateReg = /<template>([\s\S]+)<\/template>/;
const nameReg = /name:\s*"([\s\S]+?)"/;
const setupReg = /setup\(\)([\s\S]+)\}\);/;

md.renderer.rules.fence = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  if (templateReg.test(token.content)) {
    code = token.content;
    code.replace(nameReg, (match, p1) => {
      name = p1;
      return p1;
    });
    writeFileCode = token.content.replace(templateReg, (_, p1) => {
      return `<template>\n<code-box :item="item">${p1}</code-box>\n</template>`;
    });
  }
  return defaultFenceRender(tokens, idx, options, env, self);
};

export function generateDemo(rootDir: string, dir: string): Demo[] {
  const demoPath = path.join(dir, "demo");
  if (!fs.existsSync(demoPath)) {
    return [];
  }
  const demos: Demo[] = [];
  klawSync(demoPath).forEach((item) => {
    const source = fs.readFileSync(item.path, "utf8");
    const markdownData: string = md.render(source);
    const componentIndex = markdownData.indexOf("<pre>");
    const demo = {
      name,
      title: meta.title,
      content: markdownData.slice(0, componentIndex),
      code: html2Escape(code),
      showCode: markdownData.slice(componentIndex)
    };
    demos.push(demo);
    fs.writeFileSync(
      `${rootDir}/src/views/${name}.vue`,
      writeFileCode.replace(setupReg, (_, p1) => {
        return `setup()${p1}\ndata(){\nreturn {item: ${JSON.stringify(
          demo
        )}}\n}\n});`;
      })
    );
  });

  return demos;
}
