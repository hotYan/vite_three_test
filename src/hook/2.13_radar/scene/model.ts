import * as THREE from "three";
const model = new THREE.Group();
const geometry = new THREE.PlaneGeometry(5, 5);
const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
`;
const material = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  transparent: true,
  vertexShader,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);
model.add(mesh);
export { model, material };
