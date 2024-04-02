import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const height = window.innerHeight; //宽度
const width = window.innerWidth; //高度

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(290, 142, 180);
camera.lookAt(0, 0, 0);
// WebGL渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio); //设置设备像素比率,防止Canvas画布输出模糊。

renderer.setClearColor(0x005577, 1); //设置背景颜色
renderer.outputColorSpace = THREE.SRGBColorSpace;

const controls = new OrbitControls(camera, renderer.domElement);
export { renderer, camera };
