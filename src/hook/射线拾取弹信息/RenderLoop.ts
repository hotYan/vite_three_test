import { scene } from "./scene/index";
import { renderer, camera } from "./RendererCamera";
import { labelRenderer } from "./message/index";
const render = () => {
  // mesh.rotateY(0.01);
  labelRenderer.render(scene, camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
export { renderer };
