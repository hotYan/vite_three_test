import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { mesh } from "../../模块化/scene/mesh";
// const geometry = new THREE.BoxGeometry(50, 50, 50);
// const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
// const mesh = new THREE.Mesh(geometry, material);

const model = new THREE.Group();
let meshArr: THREE.Mesh[] = [];
let mixersArr = new Map();
// 创建GLTF加载器对象
const getMaterialByType = (type: string, emissiveIntensity: number = 1) => {
  // return new THREE.MeshPhongMaterial({
  //   color: type,
  //   reflectivity: 0.5,
  //   shininess: 10,
  //   // ambient: 0.5,
  //   specular: 0.5,
  // });
  return new THREE.MeshStandardMaterial({
    color: type,
    emissive: type,
    emissiveIntensity,
    roughness: 0,
    metalness: 1,
  });
};
const loader = new GLTFLoader();
loader.load("/VDU/host-v2.glb", function (gltf: any) {
  console.log("控制台查看gltf对象结构", gltf);
  //gltf.scene可以包含网格模型Mesh、光源Light等信息，至于gltf.scene是否包含光源，要看.gltf文件中是否有光源信息
  // console.log("gltf对象场景属性", gltf.scene);
  // console.log("animations", gltf.animations);
  const _indicatorMixer = new THREE.AnimationMixer(gltf.scene);
  // console.log("_indicatorMixer", _indicatorMixer);
  const animations = gltf.animations;
  // let currentAnimations = animations[1];
  // console.log("animations", animations);
  // console.log("currentAnimations", currentAnimations);

  gltf.scene.traverse(function (object: any) {
    if (object.isMesh) {
      meshArr.push(object);
      // object.getWorldPosition(new THREE.Vector3());
    }
    if (["cpu灯", "业务灯"].includes(object.name)) {
      object.material = getMaterialByType("#8f0202");
    } else if (["cpu灯动画", "业务灯动画"].includes(object.name)) {
      object.material = getMaterialByType("#ff0000", 10);
      if (["cpu灯动画"].includes(object.name)) {
        playAction(object.name, _indicatorMixer, animations[3]);
      } else {
        playAction(object.name, _indicatorMixer, animations[0]);
      }
    } else if (["内存灯"].includes(object.name)) {
      object.material = getMaterialByType("#007713");
    } else if (["内存灯动画"].includes(object.name)) {
      object.material = getMaterialByType("#00ff20", 10);
      playAction(object.name, _indicatorMixer, animations[1]);
    } else if (["磁盘灯"].includes(object.name)) {
      object.material = getMaterialByType("#b79407");
    } else if (["磁盘灯动画"].includes(object.name)) {
      object.material = getMaterialByType("#ffd500", 10);
      playAction(object.name, _indicatorMixer, animations[2]);
    }
  });
  model.add(gltf.scene);
});
const playAction = (
  name: string,
  _indicatorMixer: THREE.AnimationMixer,
  currentAnimations: any
) => {
  const action = _indicatorMixer.clipAction(currentAnimations);
  action.timeScale = 1;
  action.play();
  mixersArr.set(name, _indicatorMixer);
};

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
export { model, mixersArr, meshArr };
