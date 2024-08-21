import * as THREE from "three";
const model = new THREE.Group();
const geometry = new THREE.PlaneGeometry(6, 6, 1, 1);

const material = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  transparent: true,
});
const mesh = new THREE.Mesh(geometry, material);
model.add(mesh);
export { model, material };
