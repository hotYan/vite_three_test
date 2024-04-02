<template>
  <div id="map"></div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { renderer } from "./hook/失火提醒/RenderLoop";

const initMap = () => {
  const map = document.getElementById("map");
  map?.appendChild(renderer.domElement);
};

onMounted(() => {
  initMap();
});
</script>
