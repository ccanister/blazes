module.exports = {
  modules: [
    {
      name: "components",
      dir: {
        src: "./packages/abc",
        hasSubDir: true,
      },
    },
    {
      name: "docs",
      defaultRoute: true,
      dir: {
        src: "./docs",
        hasSubDir: false,
      },
    },
    {
      name: "acl",
      title: "@blazes/acl-访问控制列表",
      lib: true,
      dir: {
        src: "./packages/acl/docs",
        hasSubDir: false,
      },
    },
    {
      name: "form",
      componentName: "sf",
      title: "@blazes/form-动态表单",
      lib: true,
      dir: {
        src: "./packages/abc/src/sf/docs",
        hasSubDir: false,
      },
    },
  ],
};
