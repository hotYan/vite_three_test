import * as THREE from "three";

// const model = new THREE.Object3D();
const model = new THREE.Group();
// 彩色矩阵
// for (let i = 0; i < 20; i++) {
//   for (let j = 0; j < 20; j++) {
//     const material = new THREE.SpriteMaterial({
//       color: Math.random() * 0xffffff,
//     });
//     const sprite = new THREE.Sprite(material);
//     sprite.position.set(i * 4, j * 4, 0);
//     sprite.scale.set(3, 3, 1);
//     model.add(sprite);
//   }
// }

const texture = new THREE.TextureLoader().load(
  "/textures/Water.jpeg",
  (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }
);
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture,
  transparent: true,
  depthTest: false,
  blending: THREE.AdditiveBlending,
});

for (let i = 0; i < 16000; i++) {
  // 精灵模型共享材质
  const sprite = new THREE.Sprite(spriteMaterial);
  // sprite.scale.set(3, 3, 1);
  model.add(sprite);
  // 设置精灵模型位置，在长方体空间上上随机分布
  const x = 1000 * (Math.random() - 0.5);
  const y = 500 * Math.random();
  const z = 1000 * (Math.random() - 0.5);
  sprite.position.set(x, y, z);
}

export { model };
