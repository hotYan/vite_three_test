import * as THREE from "three";
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
  const time = Date.now() * 0.00005;

  for (let i = 0; i < scene.children.length; i++) {
    // console.log("scene", scene.children[i]);
    if (scene.children[i].type === "Group") {
      scene.children[i].children.forEach((item) => {
        item.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
      });
    }
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
export { renderer, resizeFn };
