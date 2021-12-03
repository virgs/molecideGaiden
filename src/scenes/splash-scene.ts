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
        const logo = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "splash");
        let scaleRatio = Math.min(window.innerWidth / logo.getBounds().width, window.innerHeight / logo.getBounds().height);
        logo.setScale(scaleRatio, scaleRatio);

        this.loadImages();
        this.loadFonts();
        this.loadSounds();
        this.loadSprites();
        this.load.start();
        this.load.on('complete', () => this.loadCompleted = true);

        this.time.addEvent({
            delay: 2000, callback: () => { //TODO wait untill animation is complete
                if (this.loadCompleted) {
                    this.scene.start("ScoreScene")
                } else {
                    this.load.on('complete', () => this.scene.start("ScoreScene"))
                }
            }
        });

    }

    private loadImages() {
        const imagesToLoad = [
            "background-castle",
            "life-tube",
        ];

        imagesToLoad.forEach(image => this.load.image(image, `./assets/images/${image}.png`));

        this.load.image('garden', [`./assets/images/garden.png`, `./assets/images/garden-normal.png`])
    }

    private loadSounds() {
        this.load.audio('backgroundMusic', `./assets/sounds/backgroundMusic.mp3`);
        this.load.audio('charPop', `./assets/sounds/charPop.mp3`);
        this.load.audio('die0', `./assets/sounds/die0.wav`);
        this.load.audio('die1', `./assets/sounds/die1.wav`);
        this.load.audio('die2', `./assets/sounds/die2.wav`);
        this.load.audio('die3', `./assets/sounds/die3.mp3`);
        this.load.audio('die4', `./assets/sounds/die4.mp3`);
        this.load.audio('gameOver', `./assets/sounds/gameOver.wav`);
        this.load.audio('rabbitHit', `./assets/sounds/rabbitHit.wav`);
        this.load.audio('specialBarHit', `./assets/sounds/specialBarHit.wav`);
        this.load.audio('starHit', `./assets/sounds/starHit.wav`);
        this.load.audio('starRaise', `./assets/sounds/starRaise.mp3`);
        this.load.audio('wrongHit', `./assets/sounds/wrongHit.wav`);

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
