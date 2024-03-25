import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const height = window.innerHeight; //宽度
const width = window.innerWidth; //高度
// 相机
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);
// WebGL渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

// const controls = new OrbitControls(camera, renderer.domElement);
export { renderer, camera };
