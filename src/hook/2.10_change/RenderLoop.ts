import * as THREE from "three";
import Tween from "@tweenjs/tween.js";
import { scene } from "./scene/index";
import {
  renderer,
  camera,
  // css2DRenderer,
  // css3DRenderer,
} from "./RendererCamera";
import { model } from "./scene/model";
const resizeFn = () => {
  const w = window.innerWidth - 200;
  const h = window.innerHeight;
  // css2DRenderer.setSize(w, h);
  // css3DRenderer.setSize(w, h);
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};

const render = () => {
  Tween.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
export { renderer, resizeFn };
