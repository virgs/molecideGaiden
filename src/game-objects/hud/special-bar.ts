import {GameObject} from "../game-object";
import {EventManager, Events} from "../../event-manager/event-manager";

export class SpecialBar implements GameObject {
    private sprite: Phaser.GameObjects.Sprite;
    private starCounter: number;

    public constructor() {
        this.starCounter = 0;
    }

    create(scene: Phaser.Scene): void {
        this.sprite = scene.add.sprite(10, 10, "stars").setInteractive();
        this.sprite.setPosition(this.sprite.getCenter().x + 20, this.sprite.getCenter().y + 80);
        this.sprite.on('pointerdown', () => this.gotHit());

        this.loadStars(scene);
        this.playAnimation()

        EventManager.on(Events.STAR_COUNTER_UPDATE, (starCounter) => {
            this.starCounter = starCounter;
            this.playAnimation();
        })
    }

    private playAnimation(): void {
        this.sprite.anims.play(`star-raise-${this.starCounter}`).once('animationcomplete', () => this.sprite.anims.play(`star-${this.starCounter}`));
    }

    update(delta: number): void {
    }

    private loadStars(scene: Phaser.Scene) {
        [...Array(5)].forEach((_, index) => {
            scene.anims.create({
                key: 'star-raise-' + index,
                frames: scene.anims.generateFrameNumbers('stars', {
                    start: index * 6,
                    end: 1 + index * 6
                }),
                repeat: 0,
                frameRate: 12
            });

            scene.anims.create({
                key: 'star-' + index,
                frames: scene.anims.generateFrameNumbers('stars', {
                    start: 2 + index * 6,
                    end: 5 + index * 6
                }),
                repeat: -1,
                frameRate: 12
            });

            this.sprite.anims.load('star-raise-' + index);
            this.sprite.anims.load('star-' + index);
        });
    }


    private gotHit() {
        EventManager.emit(Events.SPECIAL_BAR_HIT, this.starCounter);
    }
}
