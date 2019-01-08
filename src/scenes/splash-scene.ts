import {Events} from "../event-manager/event-manager";

export class SplashScene extends Phaser.Scene {

    private static readonly MIN_TIME: 2000;
    private loadCompleted: boolean;

    constructor() {
        super({
            key: "SplashScene"
        });
        this.loadCompleted = false;
    }

    public preload(): void {
        this.load.image("splash", "./assets/images/gui.png");
        this.load.json('characters', './assets/images/characters.json');
    }

    public create(): void {
        this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "splash");
        this.loadImages();
        this.loadFonts();
        this.loadSounds();
        this.loadSprites();
        this.load.start();
        this.load.on('complete', () => this.loadCompleted = true);

        // this.time.addEvent({
        //     delay: 2000, callback: () => { //TODO wait untill animation is complete
        //         if (this.loadCompleted) {
        //             this.scene.start("MainScene")
        //         } else {
        this.load.on('complete', () => this.scene.start("ScoreScene"))
        // }
        // }, callbackScope: this
        // });

    }

    private loadImages() {
        const imagesToLoad = [
            "background-castle",
            "garden",
            "life-tube",
        ];

        imagesToLoad.forEach(image => this.load.image(image, `./assets/images/${image}.png`));
    }

    private loadSounds() {
        const soundsToLoad = [
            "charPop",
            "rabbitHit",
            "starRaise",
            "starHit",
            "wrongHit",
            "specialBarHit"
        ].concat([...Array(9)].map((_, index) => `die${index}`));

        soundsToLoad.forEach((sound) => this.load.audio(sound, `./assets/sounds/${sound}.wav`));

    }

    private loadFonts() {
        // this.load.bitmapFont('scoreFont', `./assets/fonts/Monofett.png`, `./assets/fonts/Monofett.fnt`);
        this.load.bitmapFont('scoreFont', `./assets/fonts/PressStart2P-Regular.png`, `./assets/fonts/PressStart2P-Regular.fnt`);
    }

    private loadSprites() {
        const map = this.cache.json.get('characters');
        this.load.spritesheet(map.key, map.filename, map.dimensions);
        this.load.spritesheet('life', './assets/images/life.png', {
            frameWidth: 1010,
            frameHeight: 41,
            startFrame: 0,
            endFrame: 3
        });
        this.load.spritesheet('root', './assets/images/root.png', {frameWidth: 70});
        this.load.spritesheet('helicopter-killer', './assets/images/helicopter-killer.png', {
            frameWidth: 85,
            frameHeight: 361
        });
        this.load.spritesheet('stars', './assets/images/stars.png', {frameWidth: 60, frameHeight: 200});
    }
}
