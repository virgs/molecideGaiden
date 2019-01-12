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
        const scaleRatio = Math.min(window.innerWidth * 0.15 / this.sprite.getBounds().width, window.innerHeight * 0.45 / this.sprite.getBounds().height);
        this.sprite.setScale(scaleRatio, scaleRatio);
        this.sprite.setPosition(this.sprite.getCenter().x + window.innerWidth * 0.05, this.sprite.getCenter().y + window.innerHeight * 0.2);

        this.sprite.on('pointerdown', () => this.gotHit());

        this.loadStars(scene);
        this.playAnimation();

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
            this.sprite.anims.load('star-raise-' + index);
            this.sprite.anims.load('star-' + index);
        });
    }


    private gotHit() {
        if (this.starCounter > 0) {
            EventManager.emit(Events.SPECIAL_BAR_HIT, this.starCounter);
        }
    }

    destroy(): void {
        this.sprite.destroy();
        this.starCounter = 0;
    }
}
