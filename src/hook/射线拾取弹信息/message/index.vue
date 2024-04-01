<template>
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

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
