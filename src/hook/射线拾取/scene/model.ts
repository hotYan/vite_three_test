import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { label } from "./label.js";

const model = new THREE.Group();
// 创建GLTF加载器对象
let meshArr: THREE.Mesh[] = [];
const loader = new GLTFLoader();
loader.load("/model.glb", function (gltf: any) {
  // console.log("控制台查看gltf对象结构", gltf);
  // //gltf.scene可以包含网格模型Mesh、光源Light等信息，至于gltf.scene是否包含光源，要看.gltf文件中是否有光源信息
  // console.log("gltf对象场景属性", gltf.scene);
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
      console.log(object.name, 222);
      meshArr.push(object);
      const labelName = label(object.name);
      const pos = new THREE.Vector3();
      object.getWorldPosition(pos);
      switch (object.parent.name) {
        case "立筒仓":
          pos.y += 36;
          break;
        case "浅圆仓":
          pos.y += 20;
          break;
        default:
          pos.y += 17;
      }
      labelName.position.copy(pos);
      model.add(labelName);
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

export { model, meshArr };
