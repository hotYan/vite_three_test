import * as THREE from "three";
import { Color } from "three";
import { model } from "./model";
// 三维场景
const scene = new THREE.Scene();
// scene.autoUpdate = true;
// scene.background = new Color().setHex(0x005577);
scene.add(model);

scene.fog = new THREE.Fog(0x005577, -100, 1000);
/**
 * 光源设置
 */

// 平行光1
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, -80, 400);
scene.add(directionalLight);
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 10);
directionalLight2.position.set(0, 300, 0);
scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(0xffffff, 20);
ambient.position.set(0, 400, 0);
scene.add(ambient);

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);
export { scene };
