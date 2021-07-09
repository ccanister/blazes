import * as path from "path";
import { SiteConfig, File } from "./type";
const klawSync = require("klaw-sync");
import { generateDemo } from "./generate-demo";
import { generateDoc, writeDoc } from "./generate-doc";
import { generateMenu } from "./generate-menu";

const rootDir = path.resolve(__dirname, "../../");
const siteConfig = require(path.join(
  rootDir,
  "src/site.config.js"
)) as SiteConfig;

for (const m of siteConfig.modules) {
  const files: File[] = [];
  klawSync(m.dir.src, {
    nodir: false,
    filter: (item) => {
      if (m.dir.hasSubDir && item.stats.isDirectory()) {
        return true;
      }
      return (
        path.extname(item.path) === ".md" &&
        !item.path.includes(`${path.sep}demo${path.sep}`)
      );
    },
  })
    .filter((item) => path.extname(item.path) === ".md")
    .forEach((item) => {
      const mdPath = item.path;
      const parentDir = path.dirname(mdPath);
      const mdName = path.basename(mdPath, ".md");
      files.push({
        dir: parentDir,
        docPath: mdPath,
        name: mdName === "index" ? path.basename(parentDir) : mdName,
      });
    });
  files.forEach((file) => {
    const demos = generateDemo(rootDir, file, m);
    const doc = (file.doc = generateDoc(file));
    writeDoc(doc, demos, rootDir, m);
  });
  generateMenu(rootDir, files, m);
}
