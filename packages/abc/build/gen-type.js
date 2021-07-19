const fs = require("fs");
const { copyDir, resolvePath } = require("./util");
const { clean } = require("./clean");

const dirs = ["abc", "theme", "src"];

copyDir(resolvePath(`../lib/abc/src`), resolvePath("../lib/src"));
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

clean(dirs);
