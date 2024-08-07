import Tween from "@tweenjs/tween.js";
import * as THREE from "three";
import axios from "axios";
// const model = new THREE.Object3D();
const model = new THREE.Group();
// == 粒子球模型 ==
const sphereGeometry = new THREE.SphereGeometry(100, 12, 12);

const initGeometry = (url, num, cb) => {
  return new Promise((resolve) => {
    axios
      .get("https://gallery.xieyufei.com/models/points-effect/" + url)
      .then((res) => {
        const Geometry = new THREE.BufferGeometry();
        Geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(
            res.data.vertices.map((el) => el * num),
            3
          )
        );
        cb && cb(Geometry);
        resolve(Geometry.attributes.position.array);
      });
  });
};
let cpgame3Model, cpac5Model, cpbook2Model, cpmovie4Model, cpkv3Model;
initGeometry("cpgame3.json", 8, (Geometry) => {
  Geometry.translate(-4, 3, 0)
    .rotateX((40 / 180) * Math.PI)
    .rotateY((-10 / 180) * Math.PI)
    .rotateZ((-10 / 180) * Math.PI);
}).then((res) => {
  cpgame3Model = res;
});
initGeometry("cpac5.json", 6, (Geometry) => {
  Geometry.translate(5, -1, 0).rotateY((-30 / 180) * Math.PI);
}).then((res) => {
  cpac5Model = res;
});
initGeometry("cpbook2.json", 10, (Geometry) => {
  Geometry.translate(16, 0, 0).rotateX((0 / 180) * Math.PI);
}).then((res) => {
  cpbook2Model = res;
});
initGeometry("cpmovie4.json", 5, (Geometry) => {
  Geometry.translate(16, -5, 0)
    .rotateX((90 / 180) * Math.PI)
    .rotateY((180 / 180) * Math.PI);
}).then((res) => {
  cpmovie4Model = res;
});
initGeometry("cpkv3.json", 1, () => {}).then((res) => {
  cpkv3Model = res;
});

function getRandomPos() {
  const MAX_Y = 6;
  const MAX_Z = 13;
  const MAX_X = 13;
  const y = Math.random() * MAX_Y * 2 - MAX_Y;
  const z = Math.random() * MAX_Z * 2 - MAX_Z;
  const max = Math.sqrt(
    (1 - Math.pow(y, 2) / MAX_Y / MAX_Y - Math.pow(z, 2) / MAX_X / MAX_X) *
      MAX_X *
      MAX_X
  );

  const x = Math.random() * max * 2 - max;
  return [x, y, z];
}
// == 粒子矩阵 ==
// const boxGeometry = new THREE.BoxGeometry(100, 100, 100, 6, 6, 6);
const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.2,
  transparent: true,
  depthTest: false,
  blending: THREE.AdditiveBlending,
});
const randomGeometry = new THREE.BufferGeometry();
const verticles = [];
for (let i = 0; i < 10000; i++) {
  const [x, y, z] = getRandomPos();
  verticles.push(x, y, z);
}
randomGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(verticles, 3)
);

const points = new THREE.Points(randomGeometry, material);
model.add(points);
const getRandomNum = () => {
  return 2000 * Math.random() - 1000;
};
const changeGeometry = (to, duration = 1500) => {
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
  changeGeometry(cpgame3Model);
}, 1000);
setTimeout(() => {
  changeGeometry(cpac5Model);
}, 3000);
setTimeout(() => {
  changeGeometry(cpbook2Model);
}, 5000);
setTimeout(() => {
  changeGeometry(cpmovie4Model);
}, 7000);
setTimeout(() => {
  changeGeometry(cpkv3Model);
}, 9000);
export { model };
