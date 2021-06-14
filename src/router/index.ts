import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import { Menu } from "../../scripts/site/type";
import { underlineToHump } from "@/utils/common";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "布局",
    component: Layout,
    children: [],
  },
  { path: "/:catchAll(.*)", redirect: "/" },
];

const metaModules = require.context("../views", true, /\.ts$/);
metaModules.keys().forEach((metaPath, metaIndex) => {
  const absolutePath = metaPath.replace("./", "");
  const { meta } = require(`../views/${absolutePath}`) as { meta: Menu };
  let firstRedirectPath = "";
  meta.items.forEach((item) => {
    item.subs.forEach((sub) => {
      const { title, path } = sub;
        firstRedirectPath = path;
      routes[0].children!.push({
        path,
        name: underlineToHump(title),
        component: () => import(`@/views${path}/index.vue`),
      });
      if (metaIndex === 0) {
        routes[0].redirect = path;
      }
    });
  });
  routes[0].children!.push({
    path: meta.name,
    redirect: firstRedirectPath,
  });
});

console.log(routes)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
