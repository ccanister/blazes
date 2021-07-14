import * as path from "path";
import { SiteConfig, File, Lib } from "./type";
const klawSync = require("klaw-sync");
import { generateDemo } from "./generate-demo";
import { generateDoc } from "./generate-doc";
import { writeDoc, generateMenu, writeLibMeta } from "./write-file";
import { rootDir } from "./util";

const siteConfig = require(path.join(
  rootDir,
  "src/site.config.js"
)) as SiteConfig;

const libs: Lib[] = [];
for (const m of siteConfig.modules) {
  const { lib, title, dir, name } = m;
  if (lib) {
    libs.push({ label: title, routePrefix: name });
  }
  const files: File[] = [];
  klawSync(dir.src, {
    nodir: false,
    filter: (item) => {
      if (dir.hasSubDir && item.stats.isDirectory()) {
        if (item.path.includes("node_modules")) {
          return false;
        }
        if (
          !siteConfig.modules.find(
            (em) => em !== m && path.resolve(rootDir, em.dir.src) === item.path
          )
        ) {
          return true;
        }
        return false;
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
    const demos = generateDemo(file);
    const doc = (file.doc = generateDoc(file));
    if (!doc.lib) {
      writeDoc(doc, demos, m);
    }
  });
  generateMenu(files, m);
}

writeLibMeta(libs);
