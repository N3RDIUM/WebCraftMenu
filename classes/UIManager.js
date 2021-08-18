let allRandomSubtitles = [
  "Shakey-Shakey!",
  "Work in progress",
  "I'm dizzy!",
  "I'm harder than I look",
  "Well, I might look easy",
  "I am a very rare subtitle!",
  "I am a very big piece of code.",
  "A very rare subtitle indeed.",
  "Fork us on github!",
  "Press play",
  "Star us on github!",
  "Very fast",
  "I can't be speedrunned (yet)",
  "No cheating",
  "Math.floor(Math.random() * \nallRandomSubtitles.length);",
  "let choice = choice (say whaaaaat)",
  "Just hope null doesn't\n enter the world!\n(P.S. He won't)",
  "Earthquake!",
  "qwertyuiop\nasdfghjkl\nzxcvbnm!",
  "Shake your mouse to shake the world!",
  "This text is so small that you will never\nbe able to read it lol just press play, man!",
];

let choice = Math.floor(Math.random() * allRandomSubtitles.length);

class UIManager {
  constructor() {
    this.currentScreen = "home";
    this.UIElements = [];
  }
  getElements() {
    this.UIElements = [];
    if (this.currentScreen === "home") {
      canvas.style("backdrop-filter", "blur(4px)");

      let startButton = new Clickable();
      startButton.cornerRadius = 0;
      startButton.textFont = defaultFont;
      startButton.width = windowWidth / 4;
      startButton.height = 25;
      startButton.text = "Play";
      startButton.stroke = "rgba(0,0,0,0)";
      startButton.image = buttonTexture;
      startButton.textSize = 20;
      startButton.onPress = () => {
        console.log(
          "[UIManager] {Screen:" + this.currentScreen + "} Play button pressed!"
        );
        this.currentScreen = "play";
        this.getElements();
      };
      startButton.onHover = () => {
        startButton.stroke = "rgba(168, 168, 168,0)";
      };
      startButton.onOutside = () => {
        startButton.stroke = "rgba(0,0,0,0)";
      };
      startButton.locate(
        windowWidth / 2 - startButton.width / 2,
        windowHeight / 2 - startButton.height / 2
      );
      this.UIElements.push(startButton);

      let settingsButton = new Clickable();
      settingsButton.textFont = defaultFont;
      settingsButton.textSize = 20;
      settingsButton.cornerRadius = 0;
      settingsButton.image = buttonTexture;
      settingsButton.width = windowWidth / 4;
      settingsButton.height = 25;
      settingsButton.text = "Settings";
      settingsButton.stroke = "rgba(0,0,0,0)";
      settingsButton.onPress = () => {
        console.log(
          "[UIManager] {Screen:" +
            this.currentScreen +
            "} Settings button pressed!"
        );
        this.currentScreen = "settings";
        this.getElements();
      };
      settingsButton.onHover = () => {
        settingsButton.stroke = "rgba(168, 168, 168,0)";
      };
      settingsButton.onOutside = () => {
        settingsButton.stroke = "rgba(0,0,0,0)";
      };
      settingsButton.locate(
        windowWidth / 2 - settingsButton.width / 2,
        Math.round(((windowHeight / 2) * 2.2) / 2) - settingsButton.height / 2
      );
      this.UIElements.push(settingsButton);
    } else if (this.currentScreen === "settings") {
      let backButton = new Clickable();
      backButton.textFont = defaultFont;
      backButton.textSize = 20;
      backButton.cornerRadius = 0;
      backButton.image = buttonTexture;
      backButton.width = windowWidth / 4;
      backButton.height = 25;
      backButton.text = "Back";
      backButton.stroke = "rgba(0,0,0,0)";
      backButton.onPress = () => {
        console.log(
          "[UIManager] {Screen:" + this.currentScreen + "} Back button pressed!"
        );
        this.currentScreen = "home";
        this.getElements();
      };
      backButton.onHover = () => {
        backButton.stroke = "rgba(168, 168, 168,0)";
      };
      backButton.onOutside = () => {
        backButton.stroke = "rgba(0,0,0,0)";
      };
      backButton.locate(
        windowWidth / 2 - backButton.width / 2,
        Math.round(((windowHeight / 2) * 3.6) / 2) - backButton.height / 2
      );
      this.UIElements.push(backButton);
    }
  }
  render() {
    this.UIElements.forEach((element) => element.draw());
    if (this.currentScreen === "home") {
      textSize(windowHeight / 8);
      fill("#000000");
      text(
        "WebCraft",
        windowWidth / 2 -
          textWidth("WebCraf|") / 2 +
          Math.round(noise(frameCount / 10, _mouseX / 100) * 10),
        (windowHeight / 2) * 0.6 +
          Math.round(noise(_mouseY / 100, frameCount / 10) * 10)
      );
      push();
      translate(
        windowWidth / 2 +
          textWidth("WebCraf|") / 2 +
          Math.round(noise(frameCount / 10, _mouseX / 100) * 10),
        (windowHeight / 2) * 0.68 +
          Math.round(noise(_mouseY / 100, frameCount / 10) * 10)
      );
      rotate(
        -0.785398 -
          Math.round(
            noise(frameCount_ / 10, _mouseX / 100),
            noise(_mouseX / 15, _mouseY / 15)
          ) /
            100
      );
      textSize(
        (windowWidth/200)+(285 / allRandomSubtitles[choice].length)*0.5 + sin((frameCount_ / 10)+(285/windowWidth)) * 6 + 6
      );
      fill("#d1b900");
      text(allRandomSubtitles[choice], 0, 0);
      pop();

      textSize(windowHeight / 32);
      fill("#ffffff");
      text(
        "Made by our contributors on github.",
        windowWidth -
          textWidth("Made by our contributors on github.__") +
          Math.round(noise(frameCount / 25, _mouseY / 150) * 20),
        windowHeight -
          textWidth("Made by our contributors on github.__") / 15 +
          Math.round(noise(_mouseX / 150, frameCount / 25) * 20)
      );
    }
  }
  setScreen(screen) {
    this.currentScreen = screen;
    this.update();
  }
}
