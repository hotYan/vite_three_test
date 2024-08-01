import Tween from "@tweenjs/tween.js";
import * as THREE from "three";
// const model = new THREE.Object3D();
const model = new THREE.Group();
const sphereGeometry = new THREE.SphereGeometry(100, 12, 12);
// == 粒子矩阵 ==
const boxGeometry = new THREE.BoxGeometry(100, 100, 100, 6, 6, 6);
const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 2,
  transparent: true,
});
const points = new THREE.Points(boxGeometry, material);
model.add(points);
const getRandomNum = () => {
  return 2000 * Math.random() - 1000;
};
const changeGeometry = (to, duration = 1500) => {
  console.log("points", points);
  const from = points.geometry.attributes.position.array;
  const tos = mixFloatArray(from, to);
  new Tween.Tween({ ...Array.from(from) })
    .to(tos, duration)
    .easing(Tween.Easing.Quadratic.InOut)
    .onUpdate((pos) => {
      for (let key in pos) {
        points.geometry.attributes.position.array[Number(key)] = pos[key];
      }

      points.geometry.attributes.position.needsUpdate = true;
    })
    .start();
};
const getMod = (n1, n2) => {
  return [Math.floor(n1 / n2), n1 % n2];
};
const mixFloatArray = (from, to) => {
  const f = Array.from(from);
  const t = Array.from(to);
  if (f.length === t.length) {
    return { ...t };
  } else if (f.length < t.length) {
    return { ...t.splice(0, f.length) };
  } else if (f.length > t.length) {
    // ①随机生成
    // const arr = [];
    // for (let i = 0; i < f.length - t.length; i++) {
    //   arr.push(getRandomNum());
    // }
    // ②直接截取from后面部分
    // const arr = f.slice(t.length);
    // ③复制N次再截取数据M
    const arr = [];
    const len = f.length - t.length;
    const [n1, n2] = getMod(len, t.length);
    for (let i = 0; i < n1; i++) {
      arr.push(...t);
    }
    arr.push(...t.slice(0, n2));
    return { ...t.concat(arr) };
  }
};

setTimeout(() => {
  console.log(sphereGeometry.attributes.position.array, 11);
  changeGeometry(sphereGeometry.attributes.position.array);
}, 1000);
export { model };
