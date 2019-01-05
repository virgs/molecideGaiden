import {Board} from "../game-objects/board";

export class MainScene extends Phaser.Scene {
    private board: Board;
    private sprite: any;
    private anim: any;
    // private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: "MainScene"
        });

        this.board = new Board();
    }

    create(): void {


        this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "background-castle");



        const animation = {
            key: 'swinging',
            frames: this.anims.generateFrameNumbers('mole', {
                start: 0,
                end: 7
            }),
            repeat: -1,
            frameRate: 12
        };


        this.anim = this.anims.create(animation);
        this.sprite = this.add.sprite(400, 300, 'mole');

        this.sprite.anims.load('swinging');

        this.sprite.anims.play('swinging');

    }

    update(): void {

    }
}
