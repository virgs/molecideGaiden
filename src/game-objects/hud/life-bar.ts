import {GameObject} from "../game-object";
import {EventManager, Events} from "../../event-manager/event-manager";

export class LifeBar implements GameObject {
    private static readonly EASE_PACE = 0.01;
    private static readonly TOLERANCE = 0.001;

    private lifeTube: Phaser.GameObjects.Sprite;
    private life: Phaser.GameObjects.Sprite;
    private currentScore;
    private targetScore;
    private lifeDimension: Phaser.Geom.Rectangle;
    private lifeInitialOffset: number;

    public constructor() {
        this.currentScore = 1;
        this.targetScore = 1;
    }


    create(scene: Phaser.Scene): void {
        this.loadAnimation(scene);

        this.life = scene.add.sprite(scene.game.renderer.width / 2, scene.game.renderer.height / 15, 'life');
        this.lifeInitialOffset = scene.game.renderer.width / 2 + this.life.getBounds().width / 4;
        this.life.setX(this.lifeInitialOffset - (1 - this.currentScore) * this.life.getBounds().width / 2);
        this.lifeDimension = this.life.getBounds();
        this.life.setCrop(5, 0, this.lifeDimension.width * 0.495 - 5, this.lifeDimension.height);

        this.life.anims.load('life');
        this.life.anims.play('life');

        this.lifeTube = scene.add.sprite(scene.game.renderer.width / 2, scene.game.renderer.height / 15, "life-tube");
        EventManager.on(Events.SCORE_UPDATE, (score) => this.targetScore = score);
    }



    update(delta: number): void {
        if (Math.abs(this.targetScore - this.currentScore) >= LifeBar.TOLERANCE) {
            const pace = (this.targetScore - this.currentScore) * LifeBar.EASE_PACE;
            this.currentScore += pace;
            let offset = (1 - this.currentScore) * this.life.getBounds().width / 2;
            this.life.setX(this.lifeInitialOffset - offset);
            this.life.setCrop(offset + 5, 0, this.lifeDimension.width * 0.495 - 5, this.lifeDimension.height);
        } else {
            this.currentScore = this.targetScore
        }
    }

    private loadAnimation(scene: Phaser.Scene) {
        scene.anims.create({
            key: 'life',
            frames: scene.anims.generateFrameNumbers('life', {
                start: 0,
                end: 3
            }),
            repeat: -1,
            frameRate: 12
        });
    }
}
