//inbuilt variables
let RENDER_STARTLOGGEDONCE = false;
let frameCount_ = 0;
 
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
//let player = new Player();

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

function animate() {
  requestAnimationFrame(animate);
  frameCount_ += 1;
  //player.update()
  if (!RENDER_STARTLOGGEDONCE) {
    console.log("[RenderThread] rendering...");
    RENDER_STARTLOGGEDONCE = true;
  }
  renderer.render(scene, camera);
  camera.rotation.y -=
    0.001 +
    simplex.noise2D(
      simplex.noise2D(frameCount_ / 60, 0),
      simplex.noise2D(0, frameCount_ / 60)
    ) *
      0.0012;
  camera.rotation.x = simplex.noise2D(frameCount_ / 60, 0) * 0.02;
  camera.rotation.z = simplex.noise2D(0, frameCount_ / 60) * 0.02;
  //camera.rotation.x += 0.001;
}

animate();
