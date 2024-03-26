import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const height = window.innerHeight; //宽度
const width = window.innerWidth; //高度
// 相机
var k = width / height; 
var s = 100;//根据你想要渲染的粮仓范围设置相机渲染范围大小
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);
// WebGL渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true, //开启锯齿
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);//设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height);

// const controls = new OrbitControls(camera, renderer.domElement);
export { renderer, camera };
