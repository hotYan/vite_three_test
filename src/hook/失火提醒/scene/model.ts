import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createFlame } from "./flame";
import { label } from "./label";

const model = new THREE.Group();
// 创建GLTF加载器对象

const loader = new GLTFLoader();
loader.load("/modelZH.glb", function (gltf: any) {
  gltf.scene.traverse(function (object: any) {
    if (object.isMesh) {
      object.material = new THREE.MeshLambertMaterial({
        map: object.material.map,
        color: object.material.color,
      });
    }
  });
  model.add(gltf.scene);

  const granaryFlam = (name: string) => {
    const granary = gltf.scene.getObjectByName(name);
    const pos = new THREE.Vector3();
    granary.getWorldPosition(pos);
    const flame = createFlame();
    flame.position.copy(pos);
    switch (granary.parent.name) {
      case "立筒仓":
        flame.position.y += 36;
        break;
      case "浅圆仓":
        flame.position.y += 20;
        break;
      default:
        flame.position.y += 17;
    }
    flame.position.y += -4;

    const messageTag = label("粮仓" + name + "失火了！！！");
    flame.add(messageTag);
    messageTag.position.y += 40;
    flame.tag = messageTag;
    return flame;
  };
  const P_05Flame = granaryFlam("P_05");
  model.add(P_05Flame);
  setTimeout(() => {
    P_05Flame.stop();
    model.remove(P_05Flame);
    P_05Flame.remove(P_05Flame.tag);
  }, 3000);

  setTimeout(() => {
    const flame = granaryFlam("Q_05");
    model.add(flame);
  }, 1000);
});
export { model };
