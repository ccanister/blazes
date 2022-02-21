const { copyDir, resolvePath } = require("./util");
const { clean } = require("./clean");

const dirs = ["abc", "theme", "src"];

// copyDir(resolvePath(`../lib/abc/src`), resolvePath("../lib"));
copyDir(resolvePath(`../lib/src`), resolvePath("../lib"));
clean([
  ...dirs.map((dir) => `${resolvePath(`../lib/${dir}`)}`),
  resolvePath("../lib/sf/src/widgets/sf-default.vue"),
  resolvePath("../lib/sf/src/widgets/sf-default.vue.d.ts"),
]);
