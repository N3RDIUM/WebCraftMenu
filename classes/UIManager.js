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
          Math.round(noise(frameCount / 10, 0) * 10),
        (windowHeight / 2) * 0.6 + Math.round(noise(0, frameCount / 10) * 10)
      );
      textSize(windowHeight / 32);
      fill("#ffffff");
      text(
        "Made by our contributors on github.",
        windowWidth -
          textWidth("Made by our contributors on github.__") +
          Math.round(noise(frameCount / 23, 0) * 20),
        windowHeight -
          textWidth("Made by our contributors on github.__") / 15 +
          Math.round(noise(0, frameCount / 23) * 20)
      );
    }
  }
  setScreen(screen) {
    this.currentScreen = screen;
    this.update();
  }
}
