import * as THREE from "three";
const model = new THREE.Group();

const geometry = new THREE.SphereGeometry(500, 50, 50);
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("/textures/brown_photostudio_02.jpg"), //("/textures/house.jpg"),
});
const pt = new THREE.Mesh(geometry, material);
model.add(pt);
export { model };
