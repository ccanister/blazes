module.exports = {
  modules: [
    {
      name: "components",
      types: ["CURD", "基础"],
      defaultRoute: "st",
      dir: {
        src: "./packages/abc",
        hasSubDir: true,
      },
    },
  ],
};
