import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// const geometry = new THREE.BoxGeometry(50, 50, 50);
// const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
// const mesh = new THREE.Mesh(geometry, material);

const model = new THREE.Group();
// 创建GLTF加载器对象

const loader = new GLTFLoader();
loader.load("/VDU/host.glb", function (gltf: any) {
  gltf.scene.traverse(function (object: any) {
    console.log(object, 222);
    if (object.isMesh) {
      object.material = new THREE.MeshLambertMaterial({
        map: object.material.map,
        color: object.material.color,
      });
    }
  });
  model.add(gltf.scene);
});

//  const texture = new THREE.TextureLoader().load('/GLTFModel/model_img3.png');

//  const geometry = new THREE.PlaneGeometry(185,260);
//  const material = new THREE.MeshLambertMaterial({
//   side:THREE.DoubleSide,
//   map:texture
//  });
//  const plane = new THREE.Mesh(geometry,material);
//  plane.position.x = 200;
//  plane.rotateX(Math.PI/2);
//  model.add(plane);
export { model };
