import * as THREE from "three";
import { scene } from "./scene/index";
import { renderer, camera } from "./RendererCamera";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { mesh } from "./scene/model";
import * as dat from "dat.gui";
const options = {
  bloomThreshold: 0,
  bloomStrength: 2.2,
  bloomRadius: 0.2,
};
const gui = new dat.GUI();
const bloom = gui.addFolder("bloom");
bloom
  .add(options, "bloomStrength", 0, 5)
  .name("bloomStrength")
  .onChange((value) => {
    bloomPass.strength = value;
  });
bloom
  .add(options, "bloomRadius", 0.1, 2.0)
  .name("bloomRadius")
  .onChange((value) => {
    bloomPass.radius = value;
  });
bloom
  .add(options, "bloomThreshold", 0.0, 1.0)
  .name("bloomThreshold")
  .onChange((value) => {
    bloomPass.threshold = value;
  });
bloom.open();

// 辉光效果
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
console.log("bloomPass", bloomPass);
bloomPass.threshold = options.bloomThreshold;
bloomPass.strength = options.bloomStrength;
bloomPass.radius = options.bloomRadius;
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
  renderer.render(scene, camera);
  bloomComposer && bloomComposer.render(); //在 renderer.render后面调用才有效
  requestAnimationFrame(render);
};
render();
export { renderer, resizeFn, gui };
