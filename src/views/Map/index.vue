<template>
  <div id="map"></div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { renderer } from "../../hook/2.5.1_map/RenderLoop";
import { choose } from "../../hook/2.5.1_map/choose";
const initMap = () => {
  //three.js执行渲染命令会输出一个canvas画布(HTML元素)，你可以插入到web页面中
  const map = document.getElementById("map");
  map?.appendChild(renderer.domElement);
  // document.body.appendChild(renderer.domElement);
};
onMounted(() => {
  initMap();
  addEventListener("click", choose);
});
</script>
