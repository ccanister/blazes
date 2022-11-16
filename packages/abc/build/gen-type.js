const { copyDir, resolvePath } = require("./util");
const { clean } = require("./clean");

const dirs = ["abc", "src"];

copyDir(resolvePath(`../lib/abc`), resolvePath("../lib"));
clean([
  ...dirs.map((dir) => `${resolvePath(`../lib/${dir}`)}`),
  resolvePath("../lib/sf/src/widgets/sf-default.vue"),
  resolvePath("../lib/sf/src/widgets/sf-default.vue.d.ts"),
  resolvePath("../lib/sf/src/widgets/sf-item.vue.d.ts"),
  resolvePath("../lib/sf/src/widgets/sf-object.vue.d.ts"),
]);
