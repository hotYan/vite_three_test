<template>
  <div id="map"></div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { renderer, resizeFn } from "./RenderLoop";
const initMap = () => {
  //three.js执行渲染命令会输出一个canvas画布(HTML元素)，你可以插入到web页面中
  const map = document.getElementById("map");
  map?.appendChild(renderer.domElement);
};
onMounted(() => {
  initMap();
  window.addEventListener("resize", resizeFn);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeFn);
});
</script>
