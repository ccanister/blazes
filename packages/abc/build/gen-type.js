const fs = require("fs");
const { copyDir, resolvePath } = require("./util");

const files = fs.readdirSync(resolvePath("../lib"));

files.forEach((name) => {
  if (name === "src") {
    return;
  }
  const tarDir = resolvePath(`../lib/${name}`);
  if (!fs.statSync(tarDir).isDirectory()) {
    return;
  }
  copyDir(resolvePath(`../lib/src/${name}`), tarDir);
});

fs.rmdirSync(resolvePath("../lib/src"), { recursive: true, force: true });
