import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
// const geometry = new THREE.BoxGeometry(50, 50, 50);
// const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
// const mesh = new THREE.Mesh(geometry, material);


const model = new THREE.Group();
// 创建GLTF加载器对象
const loader = new GLTFLoader();

loader.load("/GLTFModel/model.gltf", function (gltf:any) {
  console.log('控制台查看gltf对象结构', gltf);
  //gltf.scene可以包含网格模型Mesh、光源Light等信息，至于gltf.scene是否包含光源，要看.gltf文件中是否有光源信息
  console.log('gltf对象场景属性', gltf.scene);
  model.add(gltf.scene);
})

 const texture = new THREE.TextureLoader().load('/GLTFModel/model_img3.png');
 
 const geometry = new THREE.PlaneGeometry(185,260);
 const material = new THREE.MeshLambertMaterial({
  side:THREE.DoubleSide,
  map:texture
 });
 const plane = new THREE.Mesh(geometry,material);
 plane.position.x = 200;
 plane.rotateX(Math.PI/2);
 model.add(plane);
 export { model };
