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
        component: () => import("../hook/2.5.1_map/index.vue"),
      },
      {
        path: "flame",
        name: "粮仓",
        component: () => import("../App_射线拾取弹信息.vue"),
      },
      {
        path: "tack",
        name: "太阳系轨道",
        component: () => import("../hook/2.6_tack/index.vue"),
      },
      {
        path: "fire",
        name: "火焰",
        component: () => import("../App_失火提醒.vue"),
        meta: { hidden: true },
      },
      {
        path: "VDU",
        name: "主机模型",
        component: () => import("../App_2.3_vud.vue"),
        meta: { hidden: true },
      },
      {
        path: "sea_sky",
        name: "海天一色",
        component: () => import("../hook/2.7_sea_sky/index.vue"),
      },
      {
        path: "sprite_rain",
        name: "模拟下雨",
        component: () => import("../hook/2.8_rain/index.vue"),
      },
      {
        path: "points",
        name: "模拟下雪",
        component: () => import("../hook/2.9_snow/index.vue"),
      },
      {
        path: "modelchange",
        name: "模型切换",
        component: () => import("../hook/2.10_change/index.vue"),
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
