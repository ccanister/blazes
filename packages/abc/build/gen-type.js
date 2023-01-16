const { copyDir, resolvePath, clean } = require("../../../scripts/utils");

const dirs = ["abc", "src"];

copyDir(resolvePath(__dirname, `../lib/abc`), resolvePath(__dirname, "../lib"));
copyDir(
  resolvePath(__dirname, `../lib/abc/src`),
  resolvePath(__dirname, "../lib")
);
clean([
  ...dirs.map((dir) => `${resolvePath(__dirname, `../lib/${dir}`)}`),
  resolvePath(__dirname, "../lib/sf/src/widgets/sf-default.vue"),
  resolvePath(__dirname, "../lib/sf/src/widgets/sf-default.vue.d.ts"),
  resolvePath(__dirname, "../lib/sf/src/widgets/sf-item.vue.d.ts"),
  resolvePath(__dirname, "../lib/sf/src/widgets/sf-object.vue.d.ts"),
]);
