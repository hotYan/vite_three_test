import * as THREE from "three";
import * as Dat from "dat.gui";
import { scene } from "./scene/index";
import { sun, water, sky, cube, clock } from "./scene/model";
import {
  renderer,
  camera,
  css2DRenderer,
  css3DRenderer,
  controls,
} from "./RendererCamera";
const waterParams = { speed: 1.0, alpha: 1.0, distortionScale: 20 };
// 让环境的光照到圆球表面
const RenderPMREMGenerator = () => {
  // let target: THREE.WebGLRenderTarget;
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const target = pmremGenerator.fromScene(scene);
  return target;
};

// 控制器
const GUI = new Dat.GUI();
const initGUI = () => {
  //太阳
  const folderSun = GUI.addFolder("太阳位置");
  folderSun.add(sun, "x", -100, 100).onChange(() => {
    updateSunPosition();
  });
  folderSun.add(sun, "y", -100, 100).onChange(() => {
    updateSunPosition();
  });
  folderSun.add(sun, "z", -100, 100).onChange(() => {
    updateSunPosition();
  });
  // 海平面
  const folderWater = GUI.addFolder("海平面");
  folderWater.add(waterParams, "speed", 0, 10).name("水流速度").step(0.1);
  folderWater.add(waterParams, "alpha", 0, 1).onChange((value) => {
    water.material.uniforms["alpha"].value = value;
  });
  folderWater
    .add(waterParams, "distortionScale", 0, 240, 0.1)
    .name("扭曲比例")
    .onChange((value) => {
      water.material.uniforms["distortionScale"].value = value;
    });

  // 天空
  const folderSky = GUI.addFolder("天空");
  const skyParams = { turbidity: 1, rayleigh: 1.5 };
  folderSky
    .add(skyParams, "turbidity", 0, 100)
    .name("浑浊度")
    .onChange((value) => {
      sky.material.uniforms["turbidity"].value = value;
    });
  folderSky
    .add(skyParams, "rayleigh", 0, 100)
    .name("锐利值")
    .onChange((value) => {
      sky.material.uniforms["rayleigh"].value = value;
    });
};
initGUI();
// 更新太阳位置
function updateSunPosition() {
  water.material.uniforms["sunDirection"].value.copy(sun).normalize();
  sky.material.uniforms["sunPosition"].value.copy(sun);

  if (target) {
    target.dispose();
  }
  scene.environment = RenderPMREMGenerator().texture;
}

const resizeFn = () => {
  const w = window.innerWidth - 200;
  const h = window.innerHeight;
  css2DRenderer.setSize(w, h);
  css3DRenderer.setSize(w, h);
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};

//将要创建的纹理对象，定义目标纹理的一些参数
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
const cubeCamera = new THREE.CubeCamera(1, 10, cubeRenderTarget);

const render = () => {
  controls.update(clock.getDelta());

  water.material.uniforms.time.value += waterParams.speed / 60.0;
  const now = Date.now();
  cube.position.y = Math.sin(now * 0.001) * 20 + 5;
  cube.rotation.x += 0.01;
  cube.rotation.z += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);

  cubeCamera.update(renderer, scene);
};
render();
const target = RenderPMREMGenerator();
if (target) {
  scene.environment = target.texture;
}
export { renderer, resizeFn };
