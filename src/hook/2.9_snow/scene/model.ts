import * as THREE from "three";
import { Float32BufferAttribute } from "three";
// const model = new THREE.Object3D();
const model = new THREE.Group();
// == 粒子矩阵 ==
// const boxGeometry = new THREE.BoxGeometry(100, 100, 100, 6, 6, 6);
// const material = new THREE.PointsMaterial({
//   color: 0xffffff,
//   size: 2,
//   transparent: true,
// });
// const points = new THREE.Points(boxGeometry, material);
// model.add(points);

// == 漫天雪花 ==
const vertices = [];
for (let i = 0; i < 10000; i++) {
  const x = Math.random() * 2000 - 1000;
  const y = Math.random() * 2000 - 1000;
  const z = Math.random() * 2000 - 1000;

  vertices.push(x, y, z);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));

// const tx = new THREE.TextureLoader().load(
//   "/textures/snowflake.jpg",
//   (texture) => {
//     texture.colorSpace = THREE.SRGBColorSpace;
//   }
// );
// const material = new THREE.PointsMaterial({
//   size: 20,
//   map: tx,
//   transparent: true,
//   depthTest: false,
//   blending: THREE.AdditiveBlending,
// });
// const points = new THREE.Points(geometry, material);
// model.add(points);
const sprite1 = new THREE.TextureLoader().load("/textures/snowflake1.png");
const sprite2 = new THREE.TextureLoader().load("/textures/snowflake2.png");
const sprite3 = new THREE.TextureLoader().load("/textures/snowflake3.png");
const sprite4 = new THREE.TextureLoader().load("/textures/snowflake4.png");
const sprite5 = new THREE.TextureLoader().load("/textures/snowflake5.png");

const parameters = [
  [[1.0, 0.2, 0.5], sprite2, 20],
  [[0.95, 0.1, 0.5], sprite3, 15],
  [[0.9, 0.05, 0.5], sprite1, 10],
  [[0.85, 0, 0.5], sprite5, 8],
  [[0.8, 0, 0.5], sprite4, 5],
];

for (let i = 0; i < parameters.length; i++) {
  const color = parameters[i][0] as number[];
  const sprite = parameters[i][1] as THREE.Texture;
  const size = parameters[i][2] as number;

  const material = new THREE.PointsMaterial({
    size,
    map: sprite,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
  });
  // material.color.setHSL(0.8, 0, 0.5);
  material.color.setHSL(color[0], color[1], color[2]);

  const pt = new THREE.Points(geometry, material);
  pt.rotation.x = Math.random() * 6;
  pt.rotation.y = Math.random() * 6;
  pt.rotation.z = Math.random() * 6;

  model.add(pt);
}
export { model };
