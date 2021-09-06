const rimraf = require("rimraf");

function clean(dirs) {
  dirs.forEach((dir) => {
    rimraf.sync(dir);
  });
}

module.exports = { clean };
