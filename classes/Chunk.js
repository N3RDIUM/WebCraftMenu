importScripts("./Block.js");
importScripts("../libraries/three.js");
import parent from "../threads/RenderThread";

console.log("[Threading] Chunk Worker Loaded");

const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial();
const cube = new THREE.Mesh(geometry, material);
console.log([cube, material, geometry, parent.scene]);
parent.scene.add(cube);

let simplex;

onmessage = function (e) {
  simplex = e.data.simplex;
};
