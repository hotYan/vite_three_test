import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

function label(name: string) {
  const dom = document.getElementById(name) as HTMLElement;
  dom!.style.pointerEvents = "none";
  const label = new CSS2DObject(dom);
  return label;
}
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "200px";
labelRenderer.domElement.style.left = "250px";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);

export { label, labelRenderer };
