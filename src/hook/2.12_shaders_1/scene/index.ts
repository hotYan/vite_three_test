import * as THREE from "three";
import { Color } from "three";
import { model } from "./model";
// 三维场景
const scene = new THREE.Scene();
// scene.autoUpdate = true;
scene.background = new Color().setHex(0x020917); //0x020917;
scene.add(model);

// console.log("scene", scene);
// scene.fog = new THREE.Fog(0x005577, -100, 1000);
/**
 * 光源设置
 */

// 平行光1
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.color.setHSL(0.1, 1, 0.95);
directionalLight.position.set(-1, 1.75, 1);
directionalLight.position.multiplyScalar(30);
scene.add(directionalLight);
// // 平行光2
// var directionalLight2 = new THREE.DirectionalLight(0xffffff, 10);
// directionalLight2.position.set(0, 300, 0);
// scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(new THREE.Color(0x404040), 1);
// ambient.position.set(0, 400, 0);
scene.add(ambient);

// const pointLight = new THREE.PointLight(new THREE.Color(0xffffff), 2, 1, 0);
// pointLight.visible = true;
// pointLight.position.set(0, 0, 0);
// scene.add(pointLight);

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);
export { scene };
