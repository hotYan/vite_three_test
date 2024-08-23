import * as THREE from "three";
import * as dat from "dat.gui";
import { scene } from "./scene/index";
import { renderer, camera } from "./RendererCamera";
import { portal, portalMaterial, options, meshModel } from "./scene/model";
import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";
const resizeFn = () => {
  const w = window.innerWidth - 200;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
// 更新材质
const updateShaderMaterial = (deltaTime) => {
  portalMaterial.uniforms.time.value = deltaTime / 5000;
  portalMaterial.uniforms.color5.value = new THREE.Vector3(...options.color5);
  portalMaterial.uniforms.color4.value = new THREE.Vector3(...options.color4);
  portalMaterial.uniforms.color3.value = new THREE.Vector3(...options.color3);
  portalMaterial.uniforms.color2.value = new THREE.Vector3(...options.color2);
  portalMaterial.uniforms.color1.value = new THREE.Vector3(...options.color1);
  portalMaterial.uniforms.color0.value = new THREE.Vector3(...options.color0);
};
// 辉光效果

const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth - 120, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = options.bloomThreshold;
bloomPass.strength = options.bloomStrength;
bloomPass.radius = options.bloomRadius;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const initGUI = () => {
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
  const colors = gui.addFolder("Colors");
  colors.addColor(options, "color0").name("layer0");
  colors.addColor(options, "color1").name("layer1");
  colors.addColor(options, "color2").name("layer2");
  colors.addColor(options, "color3").name("layer3");
  colors.addColor(options, "color4").name("layer4");
  colors.addColor(options, "color5").name("layer5");
  colors.open();
};
initGUI();

const clock = new THREE.Clock();
const render = (date = Date.now()) => {
  updateShaderMaterial(date);
  // bloomComposer && bloomComposer.render();
  // renderer.clear();
  // camera.layers.set(1);

  // renderer.clearDepth();
  // camera.layers.set(0);
  renderer.render(scene, camera);

  // const elapsedTime = clock.getElapsedTime();
  // const ghost1Angle = elapsedTime * 0.5;
  // if (meshModel) {
  //   meshModel.rotation.x = Math.cos(ghost1Angle) * 0.2;
  //   meshModel.rotation.z = Math.sin(ghost1Angle) * 0.1;
  //   meshModel.position.z += Math.cos(ghost1Angle) * 0.005;
  // }
  // const scale = Math.cos(ghost1Angle) * 2 + 3;
  // portal && portal.scale.set(scale, scale, scale);
  requestAnimationFrame(render);
  // bloomComposer && bloomComposer.render();
};
render();
export { renderer, resizeFn };
