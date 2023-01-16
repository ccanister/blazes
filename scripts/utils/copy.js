const fs = require("fs");
const path = require("path");

function copyFile(srcPath, tarPath) {
  fs.copyFileSync(srcPath, tarPath);
}

// 复制文件夹所有
function copyDir(srcDir, tarDir, forbiddenCopy) {
  if (forbiddenCopy && forbiddenCopy(tarDir, srcDir)) {
    return;
  }
  if (fs.existsSync(tarDir)) {
    const files = fs.readdirSync(srcDir);

    files.forEach(function (file) {
      const srcPath = path.join(srcDir, file);
      const tarPath = path.join(tarDir, file);

      const stats = fs.statSync(srcPath);
      if (stats.isDirectory()) {
        if (!fs.existsSync(tarDir)) {
          fs.mkdirSync(tarDir);
        }
        copyDir(srcPath, tarPath, forbiddenCopy);
      } else {
        copyFile(srcPath, tarPath);
      }
    });
  } else {
    fs.mkdirSync(tarDir);
    copyDir(srcDir, tarDir, forbiddenCopy);
  }
}

const resolvePath = (parentPath, name) => path.join(parentPath, name);

module.exports = {
  copyFile,
  copyDir,
  resolvePath,
};
