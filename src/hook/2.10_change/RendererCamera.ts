import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import {
//   CSS3DObject,
//   CSS3DRenderer,
// } from "three/examples/jsm/renderers/CSS3DRenderer.js";
// import {
//   CSS2DObject,
//   CSS2DRenderer,
// } from "three/examples/jsm/renderers/CSS2DRenderer.js";
const height = window.innerHeight; //宽度
const width = window.innerWidth - 200; //高度
console.log("height", height);
// 相机
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 2000);
camera.position.copy(new THREE.Vector3(100, 30, 600));
// camera.lookAt(new THREE.Vector3(0, 0, 1000));

// WebGL渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
  // useLegacyLights: true,
  // physicallyCorrectLights: true,
});
renderer.setPixelRatio(window.devicePixelRatio * 2); //设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height);
renderer.shadowMap.enabled = true; // 开启阴影地图功能
// renderer.shadowMap.type = THREE.VSMShadowMap; // 设置阴影地图的类型为VSM阴影地图
// renderer.autoClear = true; // 设置渲染器自动清除

// renderer.setClearColor(0x000000, 0.1); //设置背景颜色
// renderer.outputColorSpace = THREE.SRGBColorSpace;

// 创建一个新的CSS3DRenderer对象
// const css3DRenderer = new CSS3DRenderer();
// css3DRenderer.setSize(width, height);
// css3DRenderer.domElement.style.position = "absolute";
// css3DRenderer.domElement.style.top = "0px";
// css3DRenderer.domElement.style.left = "0px";
// css3DRenderer.domElement.style.pointerEvents = "none";
// document.body.appendChild(css3DRenderer.domElement);

// const create3DObject = (name: string) => {
//   const dom = document.getElementById(name);
//   dom!.style.pointerEvents = "none";
//   const object = new CSS3DObject(dom as HTMLElement);
//   return object;
// };

// // 创建一个新的CSS2DRenderer对象
// const css2DRenderer = new CSS2DRenderer();
// css2DRenderer.setSize(width, height);
// css2DRenderer.domElement.style.position = "absolute";
// css2DRenderer.domElement.style.top = "0px";
// css2DRenderer.domElement.style.left = "0px";
// css2DRenderer.domElement.style.pointerEvents = "none";
// document.body.appendChild(css2DRenderer.domElement);
// const create2DObject = (name: string) => {
//   const dom = document.getElementById(name) as HTMLElement;
//   dom!.style.pointerEvents = "none";
//   const object = new CSS2DObject(dom);
//   return object;
// };
// 创建一个控制器，用于控制相机运行
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.rotateSpeed = 0.1;
controls.dampingFactor = 0.1;
// // controls.maxDistance = 600;
// controls.minDistance = 40;
// controls.maxPolarAngle = 89.5 * (Math.PI / 180);
// // controls.minPolarAngle = 0;

console.log("controls", controls);
export {
  renderer,
  // css2DRenderer,
  // create2DObject,
  // css3DRenderer,
  // create3DObject,
  camera,
  controls,
};
