const { copyDir, resolvePath } = require("./util");
const { clean } = require("./clean");

const dirs = ["abc", "theme", "src"];

copyDir(resolvePath(`../lib/abc`), resolvePath("../lib"));
copyDir(resolvePath(`../lib/abc/src`), resolvePath("../lib"));
clean(dirs);
