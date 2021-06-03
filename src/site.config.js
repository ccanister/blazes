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
      dir: {
        src: "./docs",
        hasSubDir: false,
      },
    },
  ],
};
