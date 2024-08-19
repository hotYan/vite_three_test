// 1.简单写法
// void main() {
//   gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
// }

// 2.复杂写法
// void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;
//   gl_Position = projectedPosition;
// }

//  3.y轴移动效果
// void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   modelPosition.y += 1.0;// 3.y轴移动效果
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;
//   gl_Position = projectedPosition;
// }

//  4.波浪弧度效果
// void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;// 4.波浪弧度效果
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;
//   gl_Position = projectedPosition;
// }

//  5.随机尖峰效果
// attribute float aRandom;//5.随机尖峰效果
// void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   modelPosition.z += aRandom * 0.1;// 5.随机尖峰效果
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;
//   gl_Position = projectedPosition;
// }

// 6.将aRandom从顶点着色器传递给片元着色器（基于5）
// varying float vRandom;//6
// attribute float aRandom;//5.随机尖峰效果
// void main() {
//   vRandom = aRandom;//6
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   modelPosition.z += aRandom * 0.1;// 5.随机尖峰效果
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;
//   gl_Position = projectedPosition;
// }

//  7.加入uniforms.uFrequency
// uniform vec2 uFrequency;//7
// void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   modelPosition.z += sin(modelPosition.x * uFrequency.x) * 0.1;//7
//   modelPosition.z += sin(modelPosition.y * uFrequency.y) * 0.1;//7
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;
//   gl_Position = projectedPosition;
// }
// 创建材质的时候新加uniforms属性
// const material = new THREE.ShaderMaterial({
//   vertexShader,
//   fragmentShader,
//   uniforms: {
//     uFrequency: { value: new THREE.Vector2(10, 5) },//7
//   },
// });

//  8.加入uniforms.uTime 实现飘动的旗帜
// uniform vec2 uFrequency;
// uniform float uTime;//8
// void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;//8
//   modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;//8
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;
//   gl_Position = projectedPosition;
// }
// 创建材质的时候新加uniforms属性
// const material = new THREE.ShaderMaterial({
//   vertexShader,
//   fragmentShader,
//   uniforms: {
//     uFrequency: { value: new THREE.Vector2(10, 5) },
//     uTime: { value: 0 },//8
//   },
// });
// 在render 函数中修改uTime的值
// const render = () => {
//   const elapsedTime = clock.getElapsedTime();//8
//   material.uniforms.uTime.value = elapsedTime;//8
//   renderer.render(scene, camera);
//   requestAnimationFrame(render);
// };

//  9.加入uniforms.uColor 修改颜色
// 创建材质的时候新加uniforms属性
// const material = new THREE.ShaderMaterial({
//   vertexShader,
//   fragmentShader,
//   uniforms: {
//     uFrequency: { value: new THREE.Vector2(10, 5) },
//     uTime: { value: 0 },
//     uColor: { value: new THREE.Color("orange") },//9
//   },
// });


//  10.加入旗帜贴图
// varying vec2 vUv;//10
// uniform vec2 uFrequency;
// uniform float uTime;
// void main() {
//   vUv = uv;//10
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
//   modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;
//   gl_Position = projectedPosition;
// }
// 创建材质的时候新加uniforms属性
// const material = new THREE.ShaderMaterial({
//   vertexShader,
//   fragmentShader,
//   uniforms: {
//     ...
//     uTexture: { value: textureLoader.load("/textures/flag.png") },//10
//   },
// });

//  11.加入阴影变化
// varying float vElevation;//11
// varying vec2 vUv;
// uniform vec2 uFrequency;
// uniform float uTime;
// void main() {
//   vUv = uv;
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;//11
//   elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;//11
//   modelPosition.z += elevation;//11
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;
//   gl_Position = projectedPosition;
//   vElevation = elevation;//11
// }