import * as THREE from "three";

import { Water } from "three/examples/jsm/objects/Water";
import { Sky } from "three/examples/jsm/objects/Sky";
const model = new THREE.Object3D(); // const model = new THREE.Group();
// 太阳位置
const sun = new THREE.Vector3(-80, 5, -100);

// 海平面
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
  sunDirection: sun.clone().normalize(),
});
water.rotation.x = -Math.PI / 2;
model.add(water);

// 天空
const sky = new Sky();
sky.scale.setScalar(10000);
sky.material.uniforms["sunPosition"].value.copy(sun);
sky.material.uniforms["turbidity"].value = 1;
sky.material.uniforms["rayleigh"].value = 1.5;
sky.material.uniforms["mieCoefficient"].value = 0.005;
sky.material.uniforms["mieDirectionalG"].value = 0.8;
model.add(sky);

// 多面体
const cube = new THREE.Mesh(
  new THREE.IcosahedronGeometry(20, 1),
  new THREE.MeshStandardMaterial({
    roughness: 0,
    side: THREE.DoubleSide,
    flatShading: true,
  })
);
model.add(cube);

export { model, sun, water, sky, cube };
