import * as THREE from "three";
import { scene } from "./scene/index";
import { renderer, camera } from "./RendererCamera";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { mesh } from "./scene/model";
renderer.autoClear = false;
// 辉光效果
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth - 200, window.innerHeight),
  1.5,
  0.4,
  0.85
);
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
  bloomComposer && bloomComposer.render();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
export { renderer, resizeFn };
