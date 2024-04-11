import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { mesh } from "../../模块化/scene/mesh";
// const geometry = new THREE.BoxGeometry(50, 50, 50);
// const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
// const mesh = new THREE.Mesh(geometry, material);

const model = new THREE.Group();
let meshArr: THREE.Mesh[] = [];
let mixersArr = new Map();
let tubesArr = new Map();
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
  gltf.scene.position.set(4, 0, 0);
  // console.log("控制台查看gltf对象结构", gltf);
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
const Color = {
  good: ["#007713", "#00ff20"],
  normal: ["#b79407", "#ffd500"],
  error: ["#8f0202", "#ff0000"],
};
loader.load("/VDU/vdu_lb.glb", (gltf) => {
  gltf.scene.position.set(6, 0, 0);
  const _indicatorMixer = new THREE.AnimationMixer(gltf.scene);
  const animations = gltf.animations;
  animations.map((animation) => {
    playAction2(_indicatorMixer, animation);
  });
  gltf.scene.traverse((object: any) => {
    if (["灯带001"].includes(object.name)) {
      object.material = setMaterialColorByType("error");
    } else if (["灯带动画"].includes(object.name)) {
      object.material = setMaterialColorByType("error", 1, 10);
    }
  });
  model.add(gltf.scene);
});

const playAction2 = (
  _indicatorMixer: THREE.AnimationMixer,
  currentAnimations: any
) => {
  const action = _indicatorMixer.clipAction(currentAnimations);
  action.timeScale = 1;
  action.play();
  mixersArr.set(currentAnimations.name, _indicatorMixer);
};
const setMaterialColorByType = (
  type: string = "good",
  index: number = 0,
  emissiveIntensity: number = 1
) => {
  return new THREE.MeshStandardMaterial({
    color: Color[type][index],
    emissive: Color[type][index],
    emissiveIntensity,
    roughness: 0,
    metalness: 1,
  });
};
loader.load("/VDU/nt.glb", (gltf) => {
  const _indicatorMixer = new THREE.AnimationMixer(gltf.scene);
  const animations = gltf.animations;
  animations.map((animation) => {
    playAction2(_indicatorMixer, animation);
  });
  gltf.scene.traverse((object: any) => {
    if (["灯带001"].includes(object.name)) {
      object.material = setMaterialColorByType("error");
    } else if (["灯带动画"].includes(object.name)) {
      object.material = setMaterialColorByType("error", 1, 10);
    }
  });
  model.add(gltf.scene);
});
console.log("model", model);
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

// 三维样条曲线
const path = new THREE.CatmullRomCurve3(
  [
    // new THREE.Vector3(-50, 20, 90),
    //

    new THREE.Vector3(70, 0, 80),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-10, 40, 40),
  ],
  false,
  "chordal"
);

// path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
// const geometry = new THREE.TubeGeometry(path, 80, 0.05);
const color = "#e3cd0a";
const radius = 0.2;
let texLoader = new THREE.TextureLoader();
let tubeTexture = texLoader.load("/images/sucai.png");
tubeTexture.wrapS = tubeTexture.wrapT = THREE.RepeatWrapping;
let len = (path.points.length - 1) * 5;
tubeTexture.repeat.set(len, len);

const tubeMesh = new THREE.Mesh(
  new THREE.TubeGeometry(path, 80, radius),
  new THREE.MeshPhongMaterial({
    map: tubeTexture,
    emissive: color,
    emissiveMap: texLoader.load("/images/lavatile.jpg"),
    color: color,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide, //双面显示看到管道内壁
  })
);
tubesArr.set("1", { tubeTexture });
model.add(tubeMesh);
const tubeInnerMesh = new THREE.Mesh(
  new THREE.TubeGeometry(path, 80, radius / 5),
  new THREE.MeshPhongMaterial({
    emissive: color,
    emissiveMap: texLoader.load("/images/lavatile.jpg"),
    color: color,
    transparent: false,
    // opacity: 1,
    side: THREE.DoubleSide, //双面显示看到管道内壁
  })
);
model.add(tubeInnerMesh);
export { model, mixersArr, meshArr, tubesArr };
