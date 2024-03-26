import { scene } from "./scene/index";
// import { model } from "./scene/model";
import { renderer, camera } from "./RendererCamera";
const render = () => {
  // mesh.rotateY(0.01);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
export { renderer };
