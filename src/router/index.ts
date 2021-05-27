import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Basic from "../views/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Basic,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
