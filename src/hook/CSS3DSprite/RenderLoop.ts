import { scene } from "./scene/index";
// import { model } from "./scene/model";
import { renderer, camera } from "./RendererCamera";
import { labelRenderer } from "./scene/label";
const render = () => {
  // mesh.rotateY(0.01);
  labelRenderer.render(scene, camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
export { renderer };
