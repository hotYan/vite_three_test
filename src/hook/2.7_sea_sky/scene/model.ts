import * as THREE from "three";
import { label } from "./label";
const model = new THREE.Object3D(); // const model = new THREE.Group();

const spotTack = (r, post, j) => {
  // 轨道
  const geometry = new THREE.RingGeometry(r, r + 1, 1000);
  // const geometry = new THREE.CircleGeometry(r, 1000);
  const material = new THREE.LineBasicMaterial({
    color: 0x3498db, //0x909497, //0xffffff, //0x1b4f72,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide,
  });

  const tack = new THREE.Mesh(geometry, material);
  tack.position.set(post[0], post[1], post[2]);
  tack.rotation.set(0.5 * Math.PI, 0, 0);
  model.add(tack);
  renderCicle(r, post, j);
};
const renderCicle = (r, post, j) => {
  const outerRadius = r;
  const innerRadius = [4, 2].includes(j) ? r - 80 : r - 30;
  // const startColor = new THREE.Color(0x1b4f72);
  // const endColor = new THREE.Color(0x1b4f78);
  const vertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `;

  const fragmentShader = `
  varying vec3 vPosition;
  uniform float innerRadius;
  uniform float outerRadius;
  uniform vec3 startColor;
  uniform vec3 endColor;

  void main() {
    float distanceToCenter = length(vPosition.xy);
    float progress = (distanceToCenter - innerRadius) / (outerRadius - innerRadius);
    vec3 color = mix(startColor, endColor, progress); // 根据进度设置颜色，进行渐变
    gl_FragColor = vec4(color, progress*0.8);
  }
  `;
  // 轨道间环
  const geometry1 = new THREE.RingGeometry(innerRadius, outerRadius, 1000);
  const material1 = new THREE.ShaderMaterial({
    transparent: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      innerRadius: { value: innerRadius },
      outerRadius: { value: outerRadius },
      startColor: { value: new THREE.Color(0x2471a3) }, //0x2471a3
      endColor: { value: new THREE.Color(0x2e86c1) }, //0x2e86c1
    },
  });
  const circleLoop = new THREE.Mesh(geometry1, material1);
  // circleLoop.position.set(post[0], post[1] + 4 * r - 20, post[2]);
  // circleLoop.rotation.set(1 * Math.PI, 0, 0);
  circleLoop.position.set(post[0], post[1], post[2]);
  circleLoop.rotation.set(0.5 * Math.PI, 0, 0);
  model.add(circleLoop);
};
const renderTack = (minR, maxR, post, num = 5) => {
  let j = 0;
  for (let i = maxR; i >= minR; i -= (maxR - minR) / num) {
    j += 1;
    post[1] += -3;
    spotTack(i, post, j);
  }
  const l = label();
  l.position.set(0, 0, 0);
};
renderTack(50, 400, [0, 0, 0]);

export { model };
