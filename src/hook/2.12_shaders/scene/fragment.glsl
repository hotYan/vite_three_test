// 1-5,7,8
// void main() {
//   gl_FragColor = vec4(.5, 0.0, 1.0, 1.0);//紫色
// }


//6
// varying float vRandom;
// void main() {
//   gl_FragColor = vec4(.5, vRandom, 1.0, 1.0);
// }

// 9
// uniform vec3 uColor;
// void main() {
//   gl_FragColor = vec4(uColor, 1.0);
// }

// 10
// varying vec2 vUv;
// uniform sampler2D uTexture;
// void main() {
//   gl_FragColor = texture2D(uTexture, vUv);
// }

// 11 
// varying float vElevation;
// uniform sampler2D uTexture;
// varying vec2 vUv;
// void main() {
//   vec4 textureColor = texture2D(uTexture, vUv);
//   textureColor.rgb *= vElevation * 2.0 + 0.5;
//   gl_FragColor = textureColor;
// }