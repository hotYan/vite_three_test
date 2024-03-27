import { CSS3DObject,CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

function label(name:string){
  const div = document.createElement('div');
  div.innerHTML=name
  div.className='label';
  const label = new CSS3DObject(div);
  div.style.pointerEvents = 'none';

  label.scale.set(0.2,0.2,0.2);//根据相机渲染范围控制HTML 3D标签尺寸
  label.rotateY(Math.PI/2);//控制HTML标签CSS3对象姿态角度
  return label;
}
const labelRenderer = new CSS3DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

export {label,labelRenderer};