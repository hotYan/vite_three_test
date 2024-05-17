import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    redirect: "/earth",
    component: () => import("../views/index.vue"),
    children: [
      {
        path: "earth",
        component: () => import("../views/Earth/index.vue"),
      },
      {
        path: "map",
        component: () => import("../views/Map/index.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRouter],
  strict: false,
  // scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
