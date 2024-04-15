import * as THREE from "three";
import * as D3 from "d3";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
const Projection = D3.geoMercator().center([116, 39]).translate([0, 0]);
// .scale(80)
const model = new THREE.Object3D(); // const model = new THREE.Group();
const loader = new THREE.FileLoader();
loader.load("/china_v3.json", (data) => {
  const gltf = JSON.parse(data as string);
  console.log(gltf, 22);
  operationData(gltf);
});
// 绘制几何图形
const drawPolygoneMesh = (polygon, color: string) => {
  const shape = new THREE.Shape();
  polygon.forEach((points: number[], i: number) => {
    const [x, y] = Projection(points); //[arr[0], arr[1]];
    if (i === 0) {
      shape.moveTo(x, -y);
    }
    shape.lineTo(x, -y);
  });
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 10,
    bevelEnabled: false,
  });
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.5,
  });
  return new THREE.Mesh(geometry, material);
};
// 解析数据
const operationData = (data) => {
  data.features.forEach((f) => {
    const province = new THREE.Object3D();
    province.name = f.properties.name;
    const coordinates = f.geometry.coordinates;
    const color = "yellow";

    if (f.geometry.type === "MultiPolygon") {
      coordinates.forEach((coordinate) => {
        addMeshToProvince(province, coordinate, color);
      });
    }

    if (f.geometry.type === "Polygon") {
      addMeshToProvince(province, coordinates, color);
    }
    model.add(province);
  });
};
const addMeshToProvince = (province, coordinate, color) => {
  coordinate.forEach((polygon) => {
    province.add(drawPolygoneMesh(polygon, color));
    province.add(drawPolygoneOutLine(polygon, color));
  });
};
// 绘制几何图形轮廓
const drawPolygoneOutLine = (polygon, color) => {
  const lineGeometry = new THREE.BufferGeometry();
  const pointArr = new Array<THREE.Vector3>();
  polygon.forEach((points: number[]) => {
    const [x, y] = Projection(points);
    pointArr.push(new THREE.Vector3(x, -y, 9));
  });
  lineGeometry.setFromPoints(pointArr);
  const lineMaterial = new THREE.LineBasicMaterial({ color });
  return new THREE.Line(lineGeometry, lineMaterial);
};
// 绘制圆和圆环
const circleArr = [];
const spotCircle = (spot) => {
  // 圆
  const geometry = new THREE.CircleGeometry(0.5, 200);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  });
  const circle = new THREE.Mesh(geometry, material);
  circle.position.set(spot[0], -spot[1], spot[2] + 0.1);
  model.add(circle);

  // 圆环
  const geometry1 = new THREE.RingGeometry(0.5, 0.7, 50);
  const material1 = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const circleLoop = new THREE.Mesh(geometry1, material1);
  circleLoop.position.set(spot[0], -spot[1], spot[2] + 0.1);
  model.add(circleLoop);
  circleArr.push(circleLoop);
};
// 飞线
const lineConnect = (start, end) => {
  const [x0, y0, z0] = [...start, 10.01];
  const [x1, y1, z1] = [...end, 10.01];

  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(x0, -y0, z0),
    new THREE.Vector3((x0 + x1) / 2, -(y0 + y1) / 2, 20),
    new THREE.Vector3(x1, -y1, z1)
  );
  spotCircle([x0, y0, z0]);
  spotCircle([x1, y1, z1]);
  moveSpot(curve);
  const lineGeometry = new THREE.BufferGeometry();
  const points = curve.getPoints(50);
  const positions = [];
  const colors = [];
  const color = new THREE.Color();
  points.forEach((point, index) => {
    color.setHSL(0.81666 + index, 0.88, 0.715 + index * 0.0025);
    colors.push(color.r, color.g, color.b);
    positions.push(point.x, point.y, point.z);
  });
  lineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(positions), 3, true)
  );
  lineGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(colors), 3, true)
  );
  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
  });

  return new THREE.LineLoop(lineGeometry, lineMaterial);
};
// 移动的物体
const moveSpotsArr = [];
const moveSpot = (curve) => {
  const geometry = new THREE.SphereGeometry(0.4, 0.4, 0.4);
  const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.curve = curve;
  mesh._s = 0;
  model.add(mesh);
  moveSpotsArr.push(mesh);
};

const line = lineConnect(
  Projection([106.55, 29.55]),
  Projection([121.49, 31.23])
);
model.add(line);

const lines = [
  [
    [106.557691, 29.559296],
    [104.006215, 30.650055],
  ],
  [
    [106.557691, 29.559296],
    [116.396795, 39.93242],
  ],
];
const lineRender = (arr) => {
  arr.forEach((line) => {
    model.add(lineConnect(Projection(line[0]), Projection(line[1])));
  });
};
lineRender(lines);
export { model, circleArr, moveSpotsArr };
