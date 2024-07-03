import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS3DObject,
  CSS3DRenderer,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
const height = window.innerHeight; //宽度
const width = window.innerWidth - 200; //高度
console.log("height", height);
// 相机
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000);
camera.position.set(0, 200, 500);
camera.lookAt(0, 0, 0);

// WebGL渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
  alpha: true, // 开启透明度
  // preserveDrawingBuffer: true, // 保留绘制缓冲区
  // precision: "highp",
  logarithmicDepthBuffer: true,
});
renderer.setPixelRatio(window.devicePixelRatio); //设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height);
renderer.shadowMap.enabled = true; // 开启阴影地图功能
renderer.shadowMap.type = THREE.VSMShadowMap; // 设置阴影地图的类型为VSM阴影地图
renderer.autoClear = true; // 设置渲染器自动清除

renderer.setClearColor(0x000000, 0.1); //设置背景颜色
renderer.outputColorSpace = THREE.SRGBColorSpace;

// 创建一个新的CSS3DRenderer对象
const css3DRenderer = new CSS3DRenderer();
css3DRenderer.setSize(width, height);
css3DRenderer.domElement.style.position = "absolute";
css3DRenderer.domElement.style.top = "0px";
css3DRenderer.domElement.style.left = "0px";
css3DRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(css3DRenderer.domElement);

const create3DObject = (name: string) => {
  const dom = document.getElementById(name);
  dom!.style.pointerEvents = "none";
  const object = new CSS3DObject(dom as HTMLElement);
  return object;
};

// 创建一个新的CSS2DRenderer对象
const css2DRenderer = new CSS2DRenderer();
css2DRenderer.setSize(width, height);
css2DRenderer.domElement.style.position = "absolute";
css2DRenderer.domElement.style.top = "0px";
css2DRenderer.domElement.style.left = "0px";
css2DRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(css2DRenderer.domElement);
const create2DObject = (name: string) => {
  const dom = document.getElementById(name) as HTMLElement;
  dom!.style.pointerEvents = "none";
  const object = new CSS2DObject(dom);
  return object;
};
// 创建一个控制器，用于控制相机运行
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.rotateSpeed = 0.1;
controls.dampingFactor = 0.1;

export {
  renderer,
  css2DRenderer,
  create2DObject,
  css3DRenderer,
  create3DObject,
  camera,
};
