import * as THREE from "three";
import { scene } from "./scene/index";
import { renderer, camera } from "./RendererCamera";
import { material } from "./scene/model";
const resizeFn = () => {
  const w = window.innerWidth - 200;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
const clock = new THREE.Clock();
const render = () => {
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
export { renderer, resizeFn };
