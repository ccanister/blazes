import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "布局",
    component: Layout,
    children: [],
  },
];

const docsModules = require.context("../views", true, /[^(\.vue|\.ts)]$/);
docsModules.keys().forEach((docPath) => {
  const paths = docPath.split("/");
  if (paths.length !== 4) {
    return;
  }
  const lastName = paths[2];
  if (lastName === "meta") {
    return;
  }
  routes[0].children!.push({
    path: `${paths[1]}/${paths[2]}`,
    name: lastName,
    component: () => import(`@/views/${paths[1]}/${paths[2]}/index.vue`),
  });
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
