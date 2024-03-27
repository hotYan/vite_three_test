import * as THREE from "three";
import { model } from "./model";
// 三维场景
const scene = new THREE.Scene();
scene.add(model);

scene.fog= new THREE.Fog(0x005577,-100,1000);
/**
* 光源设置
*/


// 平行光1
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);
export { scene };
