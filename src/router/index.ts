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
metaModules.keys().forEach((metaPath) => {
  const absolutePath = metaPath.replace("./", "");
  const { meta } = require(`../views/${absolutePath}`) as { meta: Menu };
  const { items, defaultRoute, name } = meta;
  if (!items) {
    return;
  }
  let firstRedirectPath = "",
    minOrder = Number.MAX_VALUE;
  items.forEach((item) => {
    item.subs.forEach((sub) => {
      const { title, path, order, redirect } = sub;
      if (order < minOrder) {
        firstRedirectPath = path;
        minOrder = order;
      }
      const route = {
        path,
        name: underlineToHump(title) + path,
      } as RouteRecordRaw;
      if (redirect) {
        route.redirect = `/${redirect}`;
      } else {
        route.component = () => import(`@/views${path}/index.vue`);
      }
      routes[0].children!.push(route);
    });
  });
  routes[0].children!.push({
    path: name,
    redirect: firstRedirectPath,
  });
  if (defaultRoute) {
    routes[0].redirect = firstRedirectPath;
  }
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
