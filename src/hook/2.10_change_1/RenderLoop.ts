import Tween from "@tweenjs/tween.js";
import { scene } from "./scene/index";
import { renderer, camera } from "./RendererCamera";
const resizeFn = () => {
  const w = window.innerWidth - 200;
  const h = window.innerHeight;
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
