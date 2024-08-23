import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import portalVertexShader from "./vertex.glsl"; //?raw
import portalFragmentShader from "./fragment.glsl";
const model = new THREE.Group();
const portalGeometry = new THREE.PlaneGeometry(8, 8, 1, 1);

var options = {
  exposure: 2.8,
  bloomStrength: 2.39,
  bloomThreshold: 0,
  bloomRadius: 0.38,
  color0: [1, 5, 1],
  color1: [2, 20, 2],
  color2: [44, 97, 15],
  color3: [14, 28, 5],
  color4: [255, 255, 255],
  color5: [74, 145, 0],
};
const textureLoader = new THREE.TextureLoader();
const portalMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: {
      type: "f",
      value: 0.0,
    },
    perlinnoise: {
      type: "t",
      value: textureLoader.load("/2.12_shaders_2/perlinnoise.png"),
    },
    sparknoise: {
      type: "t",
      value: textureLoader.load("/2.12_shaders_2/sparknoise.png"),
    },
    waterturbulence: {
      type: "t",
      value: textureLoader.load("/2.12_shaders_2/waterturbulence.png"),
    },
    noiseTex: {
      type: "t",
      value: textureLoader.load("/2.12_shaders_2/noise.png"),
    },
    color5: {
      value: new THREE.Vector3(...options.color5),
    },
    color4: {
      value: new THREE.Vector3(...options.color4),
    },
    color3: {
      value: new THREE.Vector3(...options.color3),
    },
    color2: {
      value: new THREE.Vector3(...options.color2),
    },
    color1: {
      value: new THREE.Vector3(...options.color1),
    },
    color0: {
      value: new THREE.Vector3(...options.color0),
    },
    resolution: {
      value: new THREE.Vector2(window.innerWidth - 120, window.innerHeight),
    },
  },
  fragmentShader: portalFragmentShader,
  vertexShader: portalVertexShader,
});
const portal = new THREE.Mesh(portalGeometry, portalMaterial);
portal.layers.set(1);
model.add(portal);

let meshModel;
// 使用 dracoLoader 加载用blender压缩过的模型
const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();
dracoLoader.setDecoderPath("/draco/");
dracoLoader.setDecoderConfig({ type: "js" });
loader.setDRACOLoader(dracoLoader);

// 加载模型
loader.load("/2.12_shaders_2/rickAndMorty.glb", (mesh) => {
  if (mesh.scene) {
    mesh.scene.scale.set(0.02, 0.02, 0.02);
    mesh.scene.position.x = -0.5;
    mesh.scene.rotation.y = Math.PI;
    model.add(mesh.scene);
    // 设置层级
    mesh.scene.layers.set(0);
    meshModel = mesh.scene;
    console.log("mesh.scene", mesh.scene);
  }
});

export { model, portal, portalMaterial, options, meshModel };
