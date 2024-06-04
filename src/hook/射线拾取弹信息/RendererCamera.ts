import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const height = window.innerHeight;
const width = window.innerWidth - 200;
const camera = new THREE.PerspectiveCamera(40, width / height, 1, 3000);
camera.position.set(318, 162, 204);
camera.lookAt(0, 0, 0);
// WebGL渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height);

renderer.setClearColor(0x005577, 1); //设置背景颜色
renderer.outputColorSpace = THREE.SRGBColorSpace;

const controls = new OrbitControls(camera, renderer.domElement);
export { renderer, camera };
