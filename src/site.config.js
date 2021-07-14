module.exports = {
  modules: [
    {
      name: "components",
      types: ["CURD", "布局"],
      defaultRoute: "st",
      dir: {
        src: "./packages/abc",
        hasSubDir: true,
      },
    },
    {
      name: "docs",
      types: ["入门"],
      defaultRoute: true,
      dir: {
        src: "./docs",
        hasSubDir: false,
      },
    },
    {
      name: "acl",
      title: "@blazes/acl-访问控制列表",
      types: ["文档"],
      lib: true,
      dir: {
        src: "./packages/acl/docs",
        hasSubDir: false,
      },
    },
  ],
};
