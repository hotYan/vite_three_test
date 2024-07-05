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
  model.children.forEach((item) => {
    item.position.y -= Math.random() + 1;
    if (item.position.y <= -50) {
      item.position.y = 500;
    }
  });
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
export { renderer, resizeFn };
