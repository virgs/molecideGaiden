import {Garth} from "../game-objects/garth";

export class MainScene extends Phaser.Scene {
    private garth: Garth;
    private sprite: any;

    // private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: "MainScene"
        });

        this.garth = new Garth();
    }

    preload(): void {
        this.loadCharacters();
    }

    loadCharacters(): void {
        let frameCounter = 0;
        const map = this.cache.json.get('characters');
        map.animations.forEach((animation, animationIndex) => {
            map.objects.forEach((character, characterIndex) => {
                const key = character + '-' + animation;
                console.log(key + ' -> ' + JSON.stringify({
                    start: frameCounter,
                    end: frameCounter + 8
                }));
                this.anims.create({
                    key: key,
                    frames: this.anims.generateFrameNumbers('mole', {
                        start: frameCounter,
                        end: frameCounter + 7
                    }),
                    repeat: 0,//-1,
                    frameRate: 12
                });
                frameCounter += 8;
            });
        });

    }

    create(): void {


        this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "background-castle");

        const sprite = this.add.sprite(500, 300, 'mole');
        sprite.anims.load('star-raise');
        sprite.anims.load('star-miss');
        // sprite.anims.setRepeat(1);
        const loop = () => sprite.anims.play('star-raise')
            .once('animationcomplete', () =>
                sprite.anims.play('star-miss')
                    .once('animationcomplete', loop));
        loop();
    }

    update(time: number, delta: number): void {

    }
}
