import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const model = new THREE.Group();
let meshArr: THREE.Mesh[] = [];
const loader = new GLTFLoader();
loader.load("/model.glb", function (gltf: any) {
  gltf.scene.traverse(function (object: any) {
    if (object.isMesh) {
      object.material = new THREE.MeshLambertMaterial({
        map: object.material.map,
        color: object.material.color,
      });
    }
  });
  const group = gltf.scene.getObjectByName("粮仓");
  group.traverse(function (object: any) {
    if (object.isMesh) {
      meshArr.push(object);
    }
  });
  model.add(gltf.scene);
});

export { model, meshArr };
