import * as THREE from "three";
const model = new THREE.Group();
const textureLoader = new THREE.TextureLoader();
const vertexShader = `
varying float vElevation;
varying vec2 vUv;
uniform vec2 uFrequency;
uniform float uTime;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
  modelPosition.z += elevation;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  vElevation = elevation;
}
`;
const fragmentShader = `
varying float vElevation;
uniform sampler2D uTexture;
varying vec2 vUv;
void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  textureColor.rgb *= vElevation * 2.0 + 0.5;
  gl_FragColor = textureColor;
}
`;
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
const count = geometry.attributes.position.count;
const randoms = new Float32Array(count);
for (let i = 0; i < count; i++) {
  randoms[i] = Math.random();
}
geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 5) },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("orange") },
    uTexture: { value: textureLoader.load("/textures/flag.png") },
  },
  // wireframe: true,
  side: THREE.DoubleSide,
  transparent: true,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.y = 2 / 3;
model.add(mesh);
export { model, material };
