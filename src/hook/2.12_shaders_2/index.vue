<template>
  <div id="map" class="webgl"></div>
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
<style>
.webgl {
  background: #000 url("/2.12_shaders_2/bg.png") no-repeat center;
  background-size: cover;
}
</style>
