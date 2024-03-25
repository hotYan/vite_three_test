<template>
  <div id="map"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { onMounted } from "vue";


const initMap = () => {
  // 三维场景
  const scene = new THREE.Scene();
  // 模型对象
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  // AxesHelper：辅助观察的坐标系
  const axesHelper = new THREE.AxesHelper(250);
  scene.add(axesHelper);
  const height = window.innerHeight; //宽度
  const width = window.innerWidth; //高度
  // 相机
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
  camera.position.set(292, 223, 185);
  camera.lookAt(0, 0, 0);
  // WebGL渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  //three.js执行渲染命令会输出一个canvas画布(HTML元素)，你可以插入到web页面中
  const map = document.getElementById("map");
  map?.appendChild(renderer.domElement);
  // document.body.appendChild(renderer.domElement);

  
  function render() {
    mesh.rotateY(0.01);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
};
onMounted(() => {
  initMap();
});
</script>
