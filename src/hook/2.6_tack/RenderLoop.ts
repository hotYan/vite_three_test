import * as THREE from "three";
import { scene } from "./scene/index";
// import { mixersArr } from "./scene/model";
// import { circleArr, moveSpotsArr } from "./scene/model";
import { renderer, camera, css2DRenderer } from "./RendererCamera";
const render = () => {
  // mesh.rotateY(0.01);
  mixerRender();
  css2DRenderer.render(scene, camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // circleLoopRender();
  // moveSpotsRender();
};
const mixerRender = () => {
  // mixersArr.forEach((mixer) => {
  //   mixer.update(0.01);
  // });
};
// // 放大圆环的同时修改其透明度
// const circleLoopRender = () => {
//   circleArr.forEach((mesh) => {
//     mesh._s += 0.01;
//     mesh.scale.set(1 * mesh._s, 1 * mesh._s, 1 * mesh._s);
//     if (mesh._s <= 2) {
//       mesh.material.opacity = 2 - mesh._s;
//     } else {
//       mesh._s = 1;
//     }
//   });
// };

// // 飞线上移动的物体
// const moveSpotsRender = () => {
//   moveSpotsArr.forEach((mesh) => {
//     mesh._s += 0.006;
//     let tankP = new THREE.Vector3();
//     tankP = mesh.curve.getPointAt(mesh._s % 1);
//     mesh.position.set(tankP.x, tankP.y, tankP.z);
//   });
// };
render();
export { renderer };
