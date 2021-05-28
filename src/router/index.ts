import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import { Menu } from "../../scripts/site/type";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "布局",
    component: Layout,
    children: [],
  },
];

const metaModules = require.context("../views", true, /\.ts$/);
metaModules.keys().forEach((metaPath) => {
  const absolutePath = metaPath.replace("./", "");
  const { meta } = require(`../views/${absolutePath}`) as { meta: Menu };
  let firstRedirectPath = "";
  meta.items.forEach((item) => {
    item.subs.forEach((sub) => {
      const { title, path } = sub;
      if (!firstRedirectPath) {
        firstRedirectPath = path;
      }
      routes[0].children!.push({
        path,
        name: title,
        component: () => import(`@/views${path}/index.vue`),
      });
    });
  });
  routes[0].children!.push({
    path: meta.name,
    redirect: firstRedirectPath,
  });
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
