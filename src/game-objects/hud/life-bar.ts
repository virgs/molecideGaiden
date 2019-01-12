import {GameObject} from "../game-object";
import {EventManager, Events} from "../../event-manager/event-manager";

export class LifeBar implements GameObject {
    private static readonly EASE_PACE = 0.5;
    private static readonly TOLERANCE = 0.001;
    private static readonly IMAGE_OFFSET_ADJUST = 12;

    private lifeTube: Phaser.GameObjects.Sprite;
    private life: Phaser.GameObjects.Sprite;
    private currentScore;
    private targetScore;
    private lifeXPosition: number;
    private lifeDimension: Phaser.Geom.Rectangle;
    private scaleRatio: number;

    public constructor() {
        this.currentScore = 1;
        this.targetScore = 1;
    }


    create(scene: Phaser.Scene): void {
        // http://labs.phaser.io/edit.html?src=src\textures\crop%20texture%20image%20scaled.js

        this.life = scene.add.sprite(scene.game.renderer.width / 2 - LifeBar.IMAGE_OFFSET_ADJUST/2, scene.game.renderer.height / 15, 'life');
        this.lifeDimension = this.life.getBounds();
        this.life.setCrop(LifeBar.IMAGE_OFFSET_ADJUST, 0, this.lifeDimension.width, this.lifeDimension.height);
        this.lifeXPosition = this.life.getCenter().x;

        this.life.anims.load('life');
        this.life.anims.play('life');

        this.lifeTube = scene.add.sprite(scene.game.renderer.width / 2, scene.game.renderer.height / 15, "life-tube");
        this.scaleRatio = Math.min(window.innerWidth * 0.5 / this.lifeTube.getBounds().width, window.innerHeight * 0.2 / this.lifeTube.getBounds().height);
        this.lifeTube.setScale(this.scaleRatio, this.scaleRatio);

        EventManager.on(Events.SCORE_UPDATE, (score) => this.targetScore = score);
    }


    update(delta: number): void {
        if (Math.abs(this.targetScore - this.currentScore) >= LifeBar.TOLERANCE) {
            const pace = (this.targetScore - this.currentScore) * LifeBar.EASE_PACE;
            this.currentScore += pace;
            const crop = (1 - this.currentScore) * this.lifeDimension.width;
            this.life.setX(this.lifeXPosition - crop);
            this.life.setCrop(crop + LifeBar.IMAGE_OFFSET_ADJUST, 0, this.lifeDimension.width, this.lifeDimension.height);
        } else {
            this.currentScore = this.targetScore
        }
    }

    destroy(): void {
        this.currentScore = 1;
        this.targetScore = 1;

        this.life.destroy();
        this.lifeTube.destroy();
    }

}
