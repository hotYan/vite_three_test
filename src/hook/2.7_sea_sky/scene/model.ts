import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";

const model = new THREE.Object3D(); // const model = new THREE.Group();
const water = new Water(new THREE.PlaneGeometry(10000, 10000), {
  textureWidth: 512,
  textureHeight: 512,
  waterNormals: new THREE.TextureLoader().load(
    "/textures/waternormals.jpg",
    (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }
  ),
  waterColor: 0x0072ff,
});
water.rotation.x = -Math.PI / 2;
model.add(water);

export { model, water };
