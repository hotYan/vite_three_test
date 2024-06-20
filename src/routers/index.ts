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
        name: "3D地球",
        component: () => import("../views/Earth/index.vue"),
      },
      {
        path: "map",
        name: "平面地图",
        component: () => import("../views/Map/index.vue"),
      },
      {
        path: "flame",
        name: "粮仓",
        component: () => import("../App_射线拾取弹信息.vue"),
      },
      {
        path: "tack",
        name: "太阳系轨道",
        component: () => import("../views/Tack/index.vue"),
      },
      {
        path: "fire",
        name: "火焰",
        component: () => import("../App_失火提醒.vue"),
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
