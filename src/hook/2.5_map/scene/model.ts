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
export { model };
