export class SplashScene extends Phaser.Scene {

    private static readonly MIN_TIME: 2000;
    private readonly splash = "splash";

    constructor() {
        super({
            key: "SplashScene"
        });
    }

    public preload(): void {
        this.load.image(this.splash, "./assets/images/gui.png");
    }

    public create(): void {
        this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, this.splash);
        this.loadImages();
        this.loadSounds();
        this.load.start();

        // window.setTimeout(() => {
            this.load.on('complete', () => this.scene.start("MainScene"));
        // }, SplashScene.MIN_TIME);
    }

    private loadImages() {
        const imagesToLoad = [
            "background-castle",
            "board",
            "characters",
            "falling-root",
            "helicopter-killer",
            "life-tube",
            "life",
            "root",
            "stars"
        ];

        imagesToLoad.forEach(image => this.load.image(image, `./assets/images/${image}.png`));
    }

    private loadSounds() {
        const soundsToLoad = [];

        soundsToLoad.forEach(sound => this.load.audio(sound, `./assets/sounds/${sound}.png`));
    }
}
