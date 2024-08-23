import * as THREE from "three";
import { Color } from "three";
import { model } from "./model";
// 三维场景
const scene = new THREE.Scene();
// scene.autoUpdate = true;
// scene.background = new Color().setHex(0x020917); //0x020917;
scene.add(model);

// console.log("scene", scene);
// scene.fog = new THREE.Fog(0x005577, -100, 1000);
/**
 * 光源设置
 */

/// 添加直射光
const directionalLight = new THREE.DirectionalLight("#ffffff", 4);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 3, -1.25);
scene.add(directionalLight);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

// AxesHelper：辅助观察的坐标系
// const axesHelper = new THREE.AxesHelper(250);
// scene.add(axesHelper);
export { scene };
