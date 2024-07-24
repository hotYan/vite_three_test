<template>
  <div id="map"></div>
  <div
    id="messageTag"
    style="
      visibility: hidden;
      width: 500px;
      height: 400px;
      position: absolute;
      color: #fff;
      z-index: 2;
      font-size: 16px;
    "
  >
    <div style="position: relative">
      <div style="position: absolute; left: 0px; top: 0px">
        <img
          src="./hook/射线拾取弹信息/images/信息背景.png"
          alt=""
          style="width: 400px; opacity: 1"
        />
      </div>
      <div
        id="granaryName"
        style="position: absolute; left: 25px; top: 40px; font-size: 16px"
      >
        平房仓 P_01
      </div>
      <div style="position: absolute; left: 290px; top: 25px">
        <img
          src="./hook/射线拾取弹信息/images/温度.png"
          alt=""
          style="width: 50px"
        />
      </div>

      <div style="position: absolute; left: 330px; top: 40px">
        <span id="temperature">19</span>℃
      </div>
      <div id="grain" style="position: absolute; left: 170px; top: 50px">
        <span id="grain">红豆</span>(吨)
      </div>
      <div
        style="
          position: absolute;
          left: 80px;
          top: 85px;
          font-size: 60px;
          color: #00ffff;
          vertical-align: middle;
        "
      >
        <img
          id="grainImg"
          src="./hook/射线拾取弹信息/images/红豆.png"
          alt=""
          style="width: 60px"
        />
      </div>
      <div
        style="
          position: absolute;
          left: 155px;
          top: 80px;
          font-size: 60px;
          color: #00ffff;
          vertical-align: middle;
        "
      >
        <span id="weight">3600</span>t
      </div>
      <div
        style="
          position: absolute;
          left: 70px;
          top: 170px;
          padding: 8px 25px;
          border-radius: 30px;
          border: 1px solid #00ffff;
        "
      >
        仓高—<span id="granaryHeight">12</span>m
      </div>
      <div
        style="position: absolute; left: 225px; top: 170px; padding: 8px 25px"
      >
        粮高— <span id="grainHeight">5</span> m
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { renderer } from "./hook/射线拾取弹信息/RenderLoop";
import { choose, chooseMesh } from "./hook/射线拾取弹信息/choose";
import { label } from "./hook/射线拾取弹信息/message/index";
import messageData from "./hook/射线拾取弹信息/message/messageData";
import { scene } from "./hook/射线拾取弹信息/scene/index";

const initMap = () => {
  const map = document.getElementById("map");
  map?.appendChild(renderer.domElement);
};
const idArr = [
  "granaryName",
  "temperature",
  "grain",
  "grainImg",
  "weight",
  "granaryHeight",
  "grainHeight",
];
let messageTag;
const initLael = () => {
  messageTag = label("messageTag");
  scene.add(messageTag);
  addEventListener("click", (e) => {
    if (chooseMesh) {
      messageTag.element.style.visibility = "hidden";
    }
    choose(e);
    if (chooseMesh) {
      idArr.forEach((id) => {
        const dom = document.getElementById(id) as HTMLElement;
        if (dom) {
          if (id === "grainImg") {
            dom.src = messageData[chooseMesh.name][id];
          } else {
            dom.innerHTML = messageData[chooseMesh.name][id];
          }
        }
      });

      messageTag.element.style.visibility = "visible"; //显示标签
      // messageTag.position.copy(chooseMesh.getWorldPosition());//通过粮仓世界坐标设置标签位置
      messageTag.position.copy(chooseMesh.point); //射线在粮仓表面拾取坐标

      // 数字滚动动画
      var weightDOM = document.getElementById("weight") as HTMLElement;
      if (weightDOM) {
        weightDOM.innerHTML = "";
      }
      var weightMax = messageData[chooseMesh.name]["weight"]; //粮仓重量
      var weight = 0; //粮仓初始重量
      var interval = setInterval(function () {
        if (weight < weightMax) {
          weight += Math.floor(weightMax / 50); //重量累加
          const dom = document.getElementById("weight");
          if (dom) {
            dom.innerHTML = weight as unknown as string;
          }
        } else {
          clearInterval(interval); //一旦达到粮食重量，取消周期性函数interval
        }
      }, 5);
    }
  });
};
onMounted(() => {
  initMap();
  initLael();
});
onBeforeUnmount(() => {
  console.log("messageTag", messageTag);
  messageTag && messageTag.removeFromParent();
  console.log("onBeforeUnmount");
  renderer.dispose();
  renderer.domElement.remove();
});
</script>
