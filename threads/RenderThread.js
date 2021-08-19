//inbuilt variables
let RENDER_STARTLOGGEDONCE = false;
let LOCKED = false;
let frameCount_ = 0;
let _mouseX = 0;
let _mouseY = 0;

document.addEventListener("mousemove", function(event) {
  _mouseX = event.clientX;
  _mouseY = event.clientY;
})

console.log("[Threading] Render thread started!");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const simplex = new SimplexNoise();

scene.background = new THREE.Color("#a3fffd");
let player;

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  "./assets/textures/gui/title/background/panorama_2.png",
  "./assets/textures/gui/title/background/panorama_0.png",
  "./assets/textures/gui/title/background/panorama_4.png",
  "./assets/textures/gui/title/background/panorama_5.png",
  "./assets/textures/gui/title/background/panorama_1.png",
  "./assets/textures/gui/title/background/panorama_3.png",
]);
scene.background = texture;

const chunkworker = new Worker("../classes/Chunk.js", { type: "module" });

chunkworker.postMessage({ simplex: simplex });

export default {
  scene: scene,
  camera: camera,
  renderer: renderer,
  chunkworker: chunkworker,
  _mouseX: _mouseX,
  _mouseY: _mouseY,
  frameCount_: frameCount_,
  window: window,
};

function animate() {
  requestAnimationFrame(animate);
  frameCount_ += 1;
  if (!RENDER_STARTLOGGEDONCE) {
    console.log("[RenderThread] rendering...");
    RENDER_STARTLOGGEDONCE = true;
  }

  renderer.render(scene, camera);
  if (GAMESTATE === "play>game") {
    if (!LOCKED) {
      player = new Player();
      player.lock();
      LOCKED = true;
    }
    player.update();
  } else {
    camera.rotation.y -=
      0.001 +
      simplex.noise2D(
        simplex.noise2D(frameCount_ / 60, _mouseX / 1500),
        simplex.noise2D(_mouseY / 1500, frameCount_ / 60)
      ) *
        0.0012;
    camera.rotation.x = simplex.noise2D(frameCount_ / 60, _mouseX / 150) * 0.02;
    camera.rotation.z = simplex.noise2D(_mouseY / 150, frameCount_ / 60) * 0.02;
    //camera.rotation.x += 0.001;
  }
}

animate();
