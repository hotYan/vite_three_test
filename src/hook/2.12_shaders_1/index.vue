<template>
  <div id="map"></div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { renderer, resizeFn, gui } from "./RenderLoop";
const initMap = () => {
  //three.js执行渲染命令会输出一个canvas画布(HTML元素)，你可以插入到web页面中
  const map = document.getElementById("map");
  map?.appendChild(renderer.domElement);
};
onMounted(() => {
  initMap();
  window.addEventListener("resize", resizeFn);
  gui && gui.show();
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeFn);
  gui && gui.hide();
});
</script>
