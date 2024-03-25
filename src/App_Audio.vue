<template>
  <div id="map">
    <button @click="initAudio">play</button>
  </div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { onMounted } from "vue";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { Orbit } from "three/addons/controls/OrbitControls.js";
const initScene = () => {
  const scene = new THREE.Scene(); //场景
  const geometry = new THREE.BoxGeometry(100, 60, 20); //物体形状
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true, //开启透明
    opacity: 0.5, //设置透明度
  }); //物体材质
  const mesh = new THREE.Mesh(geometry, material); //物体
  mesh.position.set(0, 0, 0); // 位置
  scene.add(mesh); //将物体添加到场景中

  const axesHelper = new THREE.AxesHelper(150); // 辅助坐标系
  scene.add(axesHelper);
  return scene;
};
const initRenderer = (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(800, 500); //设置渲染区域尺寸
  renderer.render(scene, camera); //执行渲染操作
  //three.js执行渲染命令会输出一个canvas画布(HTML元素)，你可以插入到web页面中
  const map = document.getElementById("map");
  map?.appendChild(renderer.domElement);
  // document.body.appendChild(renderer.domElement);
};
const initCamera = () => {
  const camera = new THREE.PerspectiveCamera(30, 800 / 500, 1, 3000);
  camera.position.set(200, 200, 200); //相机位置
  camera.lookAt(0, 0, 0); //相机方向
  return camera;
};
const initAudio = () => {
  const scene = initScene(); //初始化场景
  const camera = initCamera(); //初始化相机
  initRenderer(scene, camera); //初始化渲染器
  const listener = new THREE.AudioListener();
  camera.add(listener);
  const sound = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load("public/music.mp3", function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  });
  const analyser = new THREE.AudioAnalyser(sound, 32);
  const data = analyser.getAverageFrequency();
};
onMounted(() => {
  // initAudio();
});
</script>
