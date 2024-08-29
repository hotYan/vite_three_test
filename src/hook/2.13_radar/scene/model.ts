import * as THREE from "three";
const model = new THREE.Group();

// == 雷达扫描 ==
const geometry = new THREE.PlaneGeometry(5, 5);
const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
`;
const fragmentShader = `
# define PI 3.1415926535897932384626433832795
varying vec2 vUv;
uniform float u_angle;
// 绘制圆环
float drawCircle(vec2 vUv,float r){
  float res = length(vUv);
  float width = 0.01;
  return smoothstep(r-width,r,res) - smoothstep(r,r+width,res);
}
// 绘制扇形扫描效果, 大致的思路: 固定扇形区域、旋转片元的uv坐标、若片元旋转后的uv坐标落在扇形区域内则为相应的片元上色
float drawSector(vec2 vUv, float radius) {
  // 片元的旋转角度
  float angle = -u_angle;
  // 使用二维旋转矩阵对片元进行旋转
  vec2 newvUv = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * vUv;
  vec2 x = vec2(1.0, 0.0);
  vec2 y = vec2(0.0, 1.0);
  // 用于判断片元旋转后与y轴的夹角, 值大于0.0则表明夹角处于0-90度之间
  float res = dot(newvUv, y);
  // 用于计算片元旋转后与x轴的夹角
  float angle2 = acos(dot(x, normalize(newvUv)));
  // 片元旋转后与x轴、y轴的夹角处于0-90度(即扇形区域的角度范围)之间、同时片元到中心点的距离小于0.45, 则满足条件
  if(angle2 > 0.0 && angle2 < PI/2.0 && length(newvUv) < 0.45 && res > 0.0) {
    // 片元落在扇形区间内后, 片元与x轴夹角越大片元颜色越浅
    return  1.0 - smoothstep(0.0, PI/2.0, angle2); 
  } else {
      return 0.0;
  }
}
void main() {
  vec2 newvUv = vUv;
  // 将uv坐标原点偏移到画布中心
  newvUv -= vec2(0.5);
  vec3 color = vec3(0.0, 0.0, 0.0);
  
  float circle = drawCircle(newvUv, 0.45);
  float circle2 = drawCircle(newvUv, 0.3);
  float circle3 = drawCircle(newvUv, 0.1);
  color += circle + circle2 + circle3;

  color += drawSector(newvUv, 0.45);

  gl_FragColor = vec4(color, color.r);
}

`;
const material = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  transparent: true,
  vertexShader,
  fragmentShader,
  uniforms: {
    u_angle: {
      value: 0,
    },
  },
});
const mesh = new THREE.Mesh(geometry, material);
// mesh.rotateX(-Math.PI / 2);
model.add(mesh);

// == 流动光效 ==
const lineCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(252, -9, -823),
  new THREE.Vector3(135, -10, 161),
  new THREE.Vector3(0, -9, 1045),
  new THREE.Vector3(-638, -10, 729),
  new THREE.Vector3(-1572, -10, 172),
]);
const lineGeometry = new THREE.BufferGeometry();
const linePoints = lineCurve.getSpacedPoints(1000); // 将曲线细分出更多的的点
lineGeometry.setFromPoints(linePoints);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const line = new THREE.Line(lineGeometry, lineMaterial);
model.add(line);

// 生成那道拖尾的光flowingLine
let flowingLineGeometry = new THREE.BufferGeometry();
const flowingLineMaterial = new THREE.PointsMaterial({
  color: 0xfff000,
  size: 100.0,
});
flowingLineMaterial.onBeforeCompile = (shader) => {
  console.log(shader, 11);
  shader.vertexShader = shader.vertexShader
    .replace(
      "void main() {",
      `
      attribute float scale1;
      void main() {
      `
    )
    .replace(
      "gl_PointSize = size;",
      `
      gl_PointSize = size * scale1;
      `
    );
};
const flowingLine = new THREE.Points(flowingLineGeometry, flowingLineMaterial);
model.add(flowingLine);

// 沿路径漫游

export { model, mesh, flowingLine, linePoints };
