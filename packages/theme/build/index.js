const { copyDir, resolvePath, clean } = require("../../../scripts/utils");

copyDir(
  resolvePath(__dirname, `../dist/theme/src`),
  resolvePath(__dirname, "../dist/src")
);
copyDir(
  resolvePath(__dirname, `../dist/theme`),
  resolvePath(__dirname, "../dist")
);
clean([resolvePath(__dirname, "../dist/theme")]);
