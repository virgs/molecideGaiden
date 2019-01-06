export class SplashScene extends Phaser.Scene {

    private static readonly MIN_TIME: 2000;

    constructor() {
        super({
            key: "SplashScene"
        });
    }

    public preload(): void {
        this.load.image("splash", "./assets/images/gui.png");
        this.load.json('characters', './assets/images/characters.json');
    }

    public create(): void {
        this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "splash");
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
            "garth",
            "life-tube",
        ];

        imagesToLoad.forEach(image => this.load.image(image, `./assets/images/${image}.png`));
    }

    private loadSounds() {
        const soundsToLoad = [];

        soundsToLoad.forEach(sound => this.load.audio(sound, `./assets/sounds/${sound}.png`));
    }

    private loadSprites() {
        const map = this.cache.json.get('characters');
        this.load.spritesheet(map.key, map.filename, map.dimensions);

    }
}
