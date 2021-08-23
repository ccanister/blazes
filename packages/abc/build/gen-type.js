const { copyDir, resolvePath } = require("./util");
const { clean } = require("./clean");

const dirs = ["abc", "theme", "src"];

copyDir(resolvePath(`../lib/src`), resolvePath("../lib"));
clean(dirs);
