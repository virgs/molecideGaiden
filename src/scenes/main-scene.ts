export class MainScene extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload(): void {
        this.load.image("background-castle", "./assets/images/background-castle.png");
        console.log('MainScene preloading');
    }

    create(): void {
        this.phaserSprite = this.add.sprite(400, 300, "background-castle");
        console.log('MainScene Created');
    }

    update(): void {

    }
}
