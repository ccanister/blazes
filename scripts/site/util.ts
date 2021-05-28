import * as fs from "fs";
import * as path from "path";

export function html2Escape(sHtml: string) {
  return sHtml.replace(/[<>&"]/gm, function (c) {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c];
  });
}

export function writeFileRecursive(filePath: string, content: string) {
  const lastPath = path.dirname(filePath);
  fs.mkdirSync(lastPath, { recursive: true });
  fs.writeFileSync(filePath, content);
}
