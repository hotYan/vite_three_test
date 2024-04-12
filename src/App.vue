<template>
  <div id="map"></div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { renderer } from "./hook/2.5_map/RenderLoop";
// import { scene } from "./hook/2.5_map/scene/index";
// import { create2DObject } from "./hook/2.5_map/RendererCamera";
// import { choose, chooseMesh } from "./hook/2.5_map/choose";
const initMap = () => {
  //three.js执行渲染命令会输出一个canvas画布(HTML元素)，你可以插入到web页面中
  const map = document.getElementById("map");
  map?.appendChild(renderer.domElement);
  // document.body.appendChild(renderer.domElement);
};
onMounted(() => {
  initMap();
});
</script>
