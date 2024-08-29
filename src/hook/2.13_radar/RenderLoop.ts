import * as THREE from "three";
import { scene } from "./scene/index";
import { renderer, camera } from "./RendererCamera";
import { mesh, flowingLine, linePoints } from "./scene/model";
const resizeFn = () => {
  const w = window.innerWidth - 200;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};

let flowingLineLength = 50; // 那道拖尾的光的长度（即占用了轨迹线上多少个点）
let lineIndex = 0; // 拖尾的光从轨迹线的第一个点位开始流动

const updateFlowing = () => {
  if (lineIndex > linePoints.length - flowingLineLength) {
    lineIndex = 0;
  }
  lineIndex += 1;
  let flowingLinePoints = linePoints.slice(
    lineIndex,
    lineIndex + flowingLineLength
  );
  const flowingLineCurve = new THREE.CatmullRomCurve3(flowingLinePoints);
  flowingLinePoints = flowingLineCurve.getSpacedPoints(100);
  const scale1 = [];
  for (let i = 0; i < flowingLinePoints.length; i++) {
    scale1.push((i + 1) / flowingLinePoints.length);
  }
  flowingLine.geometry.attributes.scale1 = new THREE.BufferAttribute(
    new Float32Array(scale1),
    1
  );

  // 为拖尾的光设置新的点位从而实现流动效果
  flowingLine.geometry.setFromPoints(flowingLinePoints);
};
// const clock = new THREE.Clock();
const render = () => {
  updateFlowing();
  mesh.material.uniforms.u_angle.value += (1 / 180) * Math.PI;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
export { renderer, resizeFn };
