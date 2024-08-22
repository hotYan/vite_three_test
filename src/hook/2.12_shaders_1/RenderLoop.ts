import * as THREE from "three";
import { scene } from "./scene/index";
import { renderer, controls, camera } from "./RendererCamera";
// import {
//   RenderPass,
//   EffectComposer,
//   UnrealBloomPass,
// } from "three/examples/jsm/Addons.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { mesh } from "./scene/model";

// 辉光效果
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
console.log("bloomPass", bloomPass);
bloomPass.threshold = 0;
bloomPass.strength = 2.2;
bloomPass.radius = 0.2;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const resizeFn = () => {
  const w = window.innerWidth - 200;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
// const clock = new THREE.Clock();
const render = () => {
  mesh && (mesh.rotation.y += 0.01);
  mesh && (mesh.rotation.x += 0.005);

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  bloomComposer && bloomComposer.render(); //重点！！！在requestAnimationFrame周后调用才有效
};
render();
export { renderer, resizeFn };
