import { scene } from "./scene/index";
// import { mixersArr } from "./scene/model";
import { renderer, camera, css2DRenderer } from "./RendererCamera";
const render = () => {
  // mesh.rotateY(0.01);

  // mixersArr.forEach((mixer) => {
  //   mixer.update(0.01);
  // });
  css2DRenderer.render(scene, camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
export { renderer };
