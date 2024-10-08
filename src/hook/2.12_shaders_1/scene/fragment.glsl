// 1
// varying vec2 vUv;
// void main() {
//   gl_FragColor = vec4(vUv,1.0,1.0);
// }

// 2
// varying vec2 vUv;
// void main() {
//   gl_FragColor = vec4(vUv,0,1.0);
// }

// 3 X轴渐变
// varying vec2 vUv;
// void main() {
//   float str = vUv.x;
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 4 y轴渐变
// varying vec2 vUv;
// void main() {
//   float str = vUv.y;
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 5 与4相反的效果
// varying vec2 vUv;
// void main() {
//   float str = 1.0 - vUv.y;
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 6 挤压渐变效果
// varying vec2 vUv;
// void main() {
//   float str = vUv.y * 10.0;
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 7 重复渐变效果
// varying vec2 vUv;
// void main() {
//   float str = mod(vUv.y * 10.0,1.0);
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 8 交替效果，step(临界值,value)，返回0|1
// varying vec2 vUv;
// void main() {
//   float str = mod(vUv.y * 10.0,1.0);
//   str = step(0.5,str);
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 9 交替效果，step(临界值,value)，返回0|1
// varying vec2 vUv;
// void main() {
//   float str = mod(vUv.y * 10.0,1.0);
//   str = step(0.8,str);
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 10 X轴交替效果，step(临界值,value)，返回0|1
// varying vec2 vUv;
// void main() {
//   float str = mod(vUv.x * 10.0,1.0);
//   str = step(0.8,str);
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 11 9,10叠加效果
// varying vec2 vUv;
// void main() {
//   float str = step(0.8,mod(vUv.x * 10.0,1.0));
//   str += step(0.8,mod(vUv.y * 10.0,1.0));
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 12 9,10交集效果
// varying vec2 vUv;
// void main() {
//   float str = step(0.8,mod(vUv.x * 10.0,1.0));
//   str *= step(0.8,mod(vUv.y * 10.0,1.0));
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 13 9,10交集效果，调整X轴临界值
// varying vec2 vUv;
// void main() {
//   float str = step(0.4,mod(vUv.x * 10.0,1.0));
//   str *= step(0.8,mod(vUv.y * 10.0,1.0));
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 14 条形图相交效果
// varying vec2 vUv;
// void main() {
//   float x = step(0.4,mod(vUv.x * 10.0,1.0)) * step(0.8,mod(vUv.y * 10.0,1.0));
//   float y = step(0.4,mod(vUv.y * 10.0,1.0))* step(0.8,mod(vUv.x * 10.0,1.0));
//   float str =x + y;
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 15 基于14偏移 
// varying vec2 vUv;
// void main() {
//   float x = step(0.4,mod(vUv.x * 10.0-0.2,1.0)) * step(0.8,mod(vUv.y * 10.0,1.0));
//   float y = step(0.4,mod(vUv.y-0.2 * 10.0,1.0))* step(0.8,mod(vUv.x * 10.0,1.0));
//   float str =x + y;
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 16 
// varying vec2 vUv;
// void main() {
//   float str = abs(vUv.x - 0.5);
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 17
// varying vec2 vUv;
// void main() {
//   float str = min(abs(vUv.x - 0.5),abs(vUv.y - 0.5));
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 18
// varying vec2 vUv;
// void main() {
//   float str = max(abs(vUv.x - 0.5),abs(vUv.y - 0.5));
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 19 
// varying vec2 vUv;
// void main() {
//   float str = step(0.2,max(abs(vUv.x - 0.5),abs(vUv.y - 0.5)));
//   gl_FragColor = vec4(vec3(str),1.0);
// }


// 23 噪点图
// varying vec2 vUv;
// float random(vec2 st) {
//   return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }
// void main() {
//   float str = random(vUv);
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 29 光晕效果
// varying vec2 vUv;
// void main() {
//   float str = 0.015/(distance(vUv,vec2(0.5)));
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 30 光晕挤压位移效果
// varying vec2 vUv;
// void main() {
//   float str = 0.015/(distance(vec2(vUv.x,(vUv.y-0.5)*5.0+0.5),vec2(0.5)));
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 46 噪音效果
// varying vec2 vUv; 
// vec2 fade(vec2 t) {
//   return t*t*t*(t*(t*6.0-15.0)+10.0);
// }
// vec4 permute(vec4 x) {
//   return mod(((x*34.0)+1.0)*x, 289.0);
// }
// float cnoise(vec2 P) {
//   vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
//   vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
//   Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
//   vec4 ix = Pi.xzxz;
//   vec4 iy = Pi.yyww;
//   vec4 fx = Pf.xzxz;
//   vec4 fy = Pf.yyww;
//   vec4 i = permute(permute(ix) + iy);
//   vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
//   vec4 gy = abs(gx) - 0.5;
//   vec4 tx = floor(gx + 0.5);
//   gx = gx - tx;
//   vec2 g00 = vec2(gx.x,gy.x);
//   vec2 g10 = vec2(gx.y,gy.y);
//   vec2 g01 = vec2(gx.z,gy.z);
//   vec2 g11 = vec2(gx.w,gy.w);
//   vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
//   g00 *= norm.x;
//   g01 *= norm.y;
//   g10 *= norm.z;
//   g11 *= norm.w;
//   float n00 = dot(g00, vec2(fx.x, fy.x));
//   float n10 = dot(g10, vec2(fx.y, fy.y));
//   float n01 = dot(g01, vec2(fx.z, fy.z));
//   float n11 = dot(g11, vec2(fx.w, fy.w));
//   vec2 fade_xy = fade(Pf.xy);
//   vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
//   float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
//   return 2.3 * n_xy;
// }
// void main() {
//   float str = cnoise(vUv*10.0);
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 47 奶牛花纹效果，基于46
// varying vec2 vUv; 
// void main() {
//   float str = step(0.05,cnoise(vUv*10.0));
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 48 基于46,闪电、水波纹,加人abs()
// varying vec2 vUv; 
// void main() {
//   float str =  1.0 - abs(cnoise(vUv*10.0)-0.05);
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 49 基于46,加入sin()
// varying vec2 vUv; 
// void main() {
//   float str = sin(cnoise(vUv*10.0) * 20.0);
//   gl_FragColor = vec4(vec3(str),1.0);
// }

// 50 基于49,加入step()
// varying vec2 vUv; 
// void main() {
//   float str = step(0.9,sin(cnoise(vUv*10.0) * 20.0));
//   gl_FragColor = vec4(vec3(str),1.0);
// }