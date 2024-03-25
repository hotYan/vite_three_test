import * as THREE from "three";
import { mesh } from "./mesh";
const scene = new THREE.Scene();
scene.add(mesh);

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);
export { scene };
