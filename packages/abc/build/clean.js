const rimraf = require("rimraf");
const { resolvePath } = require("./util");

function clean(dirs) {
  dirs.forEach((dir) => {
    rimraf.sync(resolvePath(`../lib/${dir}`));
  });
}

module.exports = { clean };