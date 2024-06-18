import * as THREE from "three";

const model = new THREE.Object3D(); // const model = new THREE.Group();

const spotTack = (r, post) => {
  // 轨道
  const geometry = new THREE.RingGeometry(r, r + 1, 1000);
  // const geometry = new THREE.CircleGeometry(r, 1000);
  const material = new THREE.LineBasicMaterial({
    color: 0x1b4f72,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
  });
  const tack = new THREE.Mesh(geometry, material);
  tack.position.set(post[0], post[1], post[2]);
  tack.rotation.set(0.5 * Math.PI, 0, 0);
  model.add(tack);
};
const renderCicle = (r, post) => {
  const outerRadius = r;
  const innerRadius = r - 10;
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
    gl_FragColor = vec4(color, 0.2);
  }
  `;
  // 轨道间环
  const geometry1 = new THREE.SphereGeometry(
    r * 4,
    1000,
    16,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.08
  );
  // const material1 = new THREE.MeshBasicMaterial({
  //   color: 0x1b4f72,
  //   side: THREE.DoubleSide,
  //   transparent: true,
  //   opacity: 0.2,
  // });
  const material1 = new THREE.ShaderMaterial({
    transparent: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      innerRadius: { value: innerRadius },
      outerRadius: { value: outerRadius },
      startColor: { value: new THREE.Color(0xeaf2f8) },
      endColor: { value: new THREE.Color(0xaed6f1) },
    },
  });
  const circleLoop = new THREE.Mesh(geometry1, material1);
  circleLoop.position.set(post[0], post[1] + 4 * r - 20, post[2]);
  circleLoop.rotation.set(1 * Math.PI, 0, 0);
  model.add(circleLoop);
};
const renderTack = (minR, maxR, post, num = 5) => {
  for (let i = maxR; i >= minR; i -= (maxR - minR) / num) {
    post[1] += -4;
    console.log(post, 2);
    spotTack(i, post);
  }
  renderCicle(maxR, post);
};
renderTack(100, 300, [0, 0, 0]);

export { model };
