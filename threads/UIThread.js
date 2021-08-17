// inbuilt variables
let UI_STARTLOGGEDONCE = false;

console.log("[Threading] UI Thread Started");
let UI_, initialised, defaultFont, defaultUIImages, buttonTexture;

// setup function, called while the page loads
function setup() {
  console.log("[UIThread] Initialising UI thread...");
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "2");
  UI_ = new UIManager();
  defaultFont = loadFont("./assets/RetroFont.otf");
  buttonTexture = loadImage("./assets/textures/gui/options_background.png");
  UI_.getElements();
  // log the UITexturesList variables
  //console.log(UITexturesList);
  clear();
  initialised = true;
}

// called when the window is resized
function windowResized() {
  console.log("[UIThread] window resized");
  resizeCanvas(windowWidth, windowHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  UI_.getElements();
  UI_.render();
  clear();
}

// called for rendering
function draw() {
  clear();
  if (!UI_STARTLOGGEDONCE) {
    console.log("[UIThread] rendering...");
    UI_STARTLOGGEDONCE = true;
  }
  textFont(defaultFont);
  UI_.render();
  //image(buttonTexture, 0, 0);
}
