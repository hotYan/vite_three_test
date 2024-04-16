import * as THREE from "three";
import { camera } from "./RendererCamera";
import { provinceArr } from "./scene/model";

let chooseMesh: THREE.MeshBasicMaterial;
function choose(event: any) {
  if (chooseMesh) {
    chooseMesh.material.color.set("yellow"); // 把上次选中的mesh设置为原来的颜色
  }
  const Sx = event.clientX; //鼠标单击位置横坐标
  const Sy = event.clientY; //鼠标单击位置纵坐标
  //屏幕坐标转WebGL标准设备坐标
  const x = (Sx / window.innerWidth) * 2 - 1; //WebGL标准设备横坐标
  const y = -(Sy / window.innerHeight) * 2 + 1; //WebGL标准设备纵坐标
  const raycaster = new THREE.Raycaster();
  raycaster.params.Line.threshold = 0.01;
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  var intersects = raycaster.intersectObjects(provinceArr, true);
  console.log("intersects", intersects);
  if (intersects.length > 0) {
    chooseMesh = intersects[0].object as unknown as THREE.MeshBasicMaterial; //选中的模型
    chooseMesh.material.color.set("green"); //选中改变颜色，这样材质颜色贴图.map和color颜色会相乘
    chooseMesh.point = intersects[0].point; //选中的点
  } else {
    chooseMesh = null;
  }
  console.log("chooseMesh", chooseMesh);
  console.log("chooseMesh", chooseMesh.material.color);
}

export { choose, chooseMesh };
