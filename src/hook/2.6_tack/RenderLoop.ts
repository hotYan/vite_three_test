import { scene } from "./scene/index";
import {
  renderer,
  camera,
  css2DRenderer,
  css3DRenderer,
} from "./RendererCamera";
const render = () => {
  css2DRenderer.render(scene, camera);
  css3DRenderer.render(scene, camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();

const resizeFn = () => {
  const w = window.innerWidth - 200;
  const h = window.innerHeight;
  css2DRenderer.setSize(w, h);
  css3DRenderer.setSize(w, h);
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
export { renderer, resizeFn };
