<template>
  <div id="map"></div>
  <div
    id="messageTag"
    class="label"
    style="position: absolute; color: #fff; z-index: 2; font-size: 16px"
  >
    名称:主机
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { renderer } from "./hook/2.2_map/RenderLoop";
import { scene } from "./hook/2.2_map/scene/index";
import { create2DObject } from "./hook/2.2_map/RendererCamera";
import { choose, chooseMesh } from "./hook/2.2_map/choose";
const initMap = () => {
  //three.js执行渲染命令会输出一个canvas画布(HTML元素)，你可以插入到web页面中
  const map = document.getElementById("map");
  map?.appendChild(renderer.domElement);
  // document.body.appendChild(renderer.domElement);
};
const initLabel = () => {
  const messageTag = create2DObject("messageTag");
  scene.add(messageTag);
  addEventListener("click", (e) => {
    if (chooseMesh) {
      messageTag.element.style.visibility = "hidden";
    }
    choose(e);
    messageTag.element.style.visibility = "visible";
    messageTag.element.innerHTML = "名称：" + chooseMesh.name;
    messageTag.position.copy(chooseMesh.point);
  });
};
onMounted(() => {
  initMap();
  initLabel();
});
</script>
