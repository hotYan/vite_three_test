import * as THREE from "three";
import { camera } from "./RendererCamera";
import { meshArr } from "./scene/model";

let chooseMesh: THREE.MeshLambertMaterial;
function choose(event: any) {
  if (chooseMesh) {
    chooseMesh.material.color.set(0xffffff); // 把上次选中的mesh设置为原来的颜色
  }
  var Sx = event.clientX; //鼠标单击位置横坐标
  var Sy = event.clientY; //鼠标单击位置纵坐标
  //屏幕坐标转WebGL标准设备坐标
  var x = (Sx / window.innerWidth) * 2 - 1; //WebGL标准设备横坐标
  var y = -(Sy / window.innerHeight) * 2 + 1; //WebGL标准设备纵坐标
  //创建一个射线投射器`Raycaster`
  var raycaster = new THREE.Raycaster();
  //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  //返回.intersectObjects()参数中射线选中的网格模型对象
  // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
  var intersects = raycaster.intersectObjects(meshArr);
  // console.log("射线器返回的对象", intersects);
  // console.log("射线投射器返回的对象 点point", intersects[0].point);
  // console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
  // intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    chooseMesh = intersects[0].object as unknown as THREE.MeshLambertMaterial; //选中的模型
    console.log(chooseMesh, 11);
    chooseMesh.material.color.set(0x00ffff); //选中改变颜色，这样材质颜色贴图.map和color颜色会相乘
  }
}

export { choose };
