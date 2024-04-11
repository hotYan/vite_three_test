import { scene } from "./scene/index";
import { mixersArr, tubesArr } from "./scene/model";
import { renderer, camera, css2DRenderer, controls } from "./RendererCamera";
const render = () => {
  // mesh.rotateY(0.01);
  controls.update();
  mixersArr.forEach((mixer) => {
    mixer.update(0.001);
  });
  tubesArr.forEach((tubes) => {
    const speed = 0.05;
    tubes.tubeTexture.offset.x -= speed;
    tubes.tubeTexture.offset.y -= speed;
    tubes.tubeTexture.offset.z -= speed;
  });
  css2DRenderer.render(scene, camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
export { renderer };
