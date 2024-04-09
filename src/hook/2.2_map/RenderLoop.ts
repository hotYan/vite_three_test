import { scene } from "./scene/index";
import { mixersArr } from "./scene/model";
import { renderer, camera } from "./RendererCamera";
const render = () => {
  // mesh.rotateY(0.01);

  requestAnimationFrame(render);
  mixersArr.forEach((mixer) => {
    mixer.update(0.01);
  });
  renderer.render(scene, camera);
};
render();
export { renderer };
