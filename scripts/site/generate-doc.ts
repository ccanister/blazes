import { Doc, DocMeta, File } from "./type";
const MarkIt = require("markdown-it");
import MetaDataBlock from "./meta-block";
import { parse } from "yaml";
import * as fs from "fs";
import * as path from "path";
const _ = require("underscore");
const MarkdownItSize = require("markdown-it-imsize");

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
  let id = 0;
  const anchors: string[] = [];
  const source = fs.readFileSync(file.docPath, "utf8");
  let markData: string = md.render(source);
  markData = markData.replace(/<h2>(.*)<\/h2>/g, (m, p) => {
    anchors.push(p);
    return `<h2 id=${p + id++}>${p}</h2>`;
  });
  const apiStartIndex = markData.match(/<h2.+>API<\/h2>/)?.index;
  const doc: Doc = {
    ...meta,
    anchors,
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
