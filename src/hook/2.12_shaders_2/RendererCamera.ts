import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const height = window.innerHeight; //宽度
const width = window.innerWidth - 200; //高度
// 相机
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.copy(new THREE.Vector3(0, 1, 5));

// WebGL渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio * 2); //设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height);
// 注意
renderer.autoClear = false;
renderer.setClearAlpha(0);
// renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 2;

// 创建一个控制器，用于控制相机运行
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
// 限制垂直旋转角度
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 2.5;
// 限制水平旋转角度
controls.minAzimuthAngle = -1;
controls.maxAzimuthAngle = 1;

export { renderer, camera, controls };
