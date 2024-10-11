import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import portalVertexShader from "./vertex.glsl"; //?raw
// import portalFragmentShader from "./fragment.glsl";
const model = new THREE.Group();
// const portalGeometry = new THREE.PlaneGeometry(8, 8, 1, 1);

// const textureLoader = new THREE.TextureLoader();
// const portalMaterial = new THREE.ShaderMaterial({});
// const portal = new THREE.Mesh(portalGeometry, portalMaterial);
// portal.layers.set(1);
// model.add(portal);

let meshModel;
// 使用 dracoLoader 加载用blender压缩过的模型
const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();
dracoLoader.setDecoderPath("/draco/");
dracoLoader.setDecoderConfig({ type: "js" });
loader.setDRACOLoader(dracoLoader);

// 加载模型
loader.load("/2.14/nt_scene.glb", (mesh) => {
  const obj = mesh.scene;
  // obj.scale.set(0.02, 0.02, 0.02);
  obj.rotation.x = Math.PI / 4;
  if (obj) {
    obj.traverse((t) => {
      if (t.isMesh) {
        t.receiveShadow = true;
        t.castShadow = true;
        t.material.emissive = t.material.color;
      }
      if (t.isLight) {
        t.shadow.mapSize.width = 1024; // default
        t.shadow.mapSize.height = 1024; // default
        t.castShadow = true;
        t.receiveShadow = true;
        t.shadow.bias = -0.0005;
        switch (t.name) {
          case "日光001":
            t.intensity = 5;
            break;
          case "日光":
            t.intensity = 5;
            break;
          case "聚光":
            t.visible = false;
            t.intensity = 2000;
            break;
        }

        const mapSize = 80;
        t.shadow.camera.left = -mapSize;
        t.shadow.camera.right = mapSize;
        t.shadow.camera.top = mapSize;
        t.shadow.camera.bottom = -mapSize;
        t.shadow.camera.near = 0.1;
        t.shadow.camera.far = 512;
      }
      if (t.name === "立方体007") {
        t.visible = false;
      }
    });
    model.add(obj);
  }
});

let chinaJSON = await import('./china_v3.json')
const map = new THREE.Object3D()
chinaJSON.features.forEach((f) => {
  const p = new THREE.Group()
  const { coordinates } = f.geometry
  coordinates.forEach(c=>{
    
  })
})

export { model, meshModel };
