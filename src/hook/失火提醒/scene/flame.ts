import * as THREE from "three";

const createFlame = () => {
  const num = 15;
  const w = 25;
  const h = 1.6 * w;
  const geometry = new THREE.PlaneGeometry(w, h);
  geometry.translate(0, h / 2, 0);
  const textureLoader = new THREE.TextureLoader(); //纹理贴图加载器
  const texture = textureLoader.load("/火焰.png");

  texture.repeat.set(1 / num, 1);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  const flame = new THREE.Group();
  flame.add(
    mesh,
    mesh.clone().rotateY(Math.PI / 2),
    mesh.clone().rotateY(Math.PI / 4),
    mesh.clone().rotateY((Math.PI / 4) * 3)
  );
  let t = 0;
  let stopAnimationFrame: any = null;
  const UpdateLoop = () => {
    t += 0.1;
    if (t > num) t = 0;
    texture.offset.x = Math.floor(t) / num;
    stopAnimationFrame = window.requestAnimationFrame(UpdateLoop);
  };
  UpdateLoop();

  flame.stop = () => {
    window.cancelAnimationFrame(stopAnimationFrame);
  };
  return flame;
};
export { createFlame };
