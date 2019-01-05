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
        this.loadSprites();
        this.load.start();

        // window.setTimeout(() => {
        this.load.on('complete', () => this.scene.start("MainScene"));
        // }, SplashScene.MIN_TIME);
    }

    private loadImages() {
        const imagesToLoad = [
            "background-castle",
            "board",
            "life-tube",
        ];

        imagesToLoad.forEach(image => this.load.image(image, `./assets/images/${image}.png`));
    }

    private loadSounds() {
        const soundsToLoad = [];

        soundsToLoad.forEach(sound => this.load.audio(sound, `./assets/sounds/${sound}.png`));
    }

    private loadSprites() {
        const spritesToLoad = [
            {
                name: "mole",
                file: "characters",
                frameWidth: 90,
                frameHeight: 90,
                // startFrame: 1,
                // endFrame: 7,
            },
            // "falling-root",
            // "helicopter-killer",
            // "life",
            // "root",
            // "stars"
        ];

        spritesToLoad.forEach(spriteSheet =>
            this.load.spritesheet(spriteSheet.name, `./assets/images/${spriteSheet.file}.png`, {
                frameWidth: 90,
                frameHeight: 90,
                // startFrame: 0,
                // endFrame: 7,
            }));

    }
}
