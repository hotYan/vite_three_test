import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

function label(name: string) {
  const div = document.createElement("div");
  div.innerHTML = name;
  div.className = "label";
  const label = new CSS2DObject(div);
  div.style.pointerEvents = "none";
  return label;
}
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.left = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);

export { label, labelRenderer };
