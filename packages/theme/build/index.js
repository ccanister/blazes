const { copyDir } = require("../../../scripts/utils/copy");
const { clean } = require("../../../scripts/utils/clean");
const path = require("path");

const resolvePath = (name) => path.join(__dirname, name);

copyDir(resolvePath(`../dist/theme/src`), resolvePath("../dist/src"));
copyDir(resolvePath(`../dist/theme`), resolvePath("../dist"));
clean([resolvePath("../dist/theme")]);
