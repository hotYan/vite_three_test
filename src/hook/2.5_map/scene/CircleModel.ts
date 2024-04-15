import * as THREE from "three";

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
  // 圆环
  const geometry1 = new THREE.RingGeometry(0.5, 0.7, 50);
  const material1 = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const circleLoop = new THREE.Mesh(geometry1, material1);
  circleLoop.position.set(spot[0], -spot[1], spot[2] + 0.1);
  circleArr.push(circleLoop);
};
export {};
