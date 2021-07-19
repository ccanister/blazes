const { copyDir, resolvePath } = require("./util");
const { clean } = require("./clean");
const fs = require("fs");

const dirs = ["abc", "theme", "src"];

// 有时候打出来的类型会在abc里面，有时候又会在src里面
try {
  copyDir(resolvePath(`../lib/abc`), resolvePath("../lib"));
  copyDir(resolvePath(`../lib/abc/src`), resolvePath("../lib"), (tarDir) => {
    return tarDir === resolvePath(`../lib/sf/src/widgets`);
  });
} catch (error) {
  const files = fs.readdirSync(resolvePath("../lib"));
  files.forEach((name) => {
    if (dirs.includes(name)) {
      return;
    }
    const tarDir = resolvePath(`../lib/${name}`);
    if (!fs.statSync(tarDir).isDirectory()) {
      return;
    }
    copyDir(resolvePath(`../lib/src/${name}`), tarDir);
  });
}
clean(dirs);
