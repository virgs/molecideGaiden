import {Character} from "./character";
import {Hole} from "../hole";
import {EventManager, Events} from "../../event-manager/event-manager";

export class Mole implements Character {
    private duration: number;
    private sprite: Phaser.GameObjects.Sprite;
    private map: any;
    private scene: Phaser.Scene;
    private hole: Hole;
    private alive = false;

    constructor(duration: number) {
        this.duration = duration;
    }

    create(scene: Phaser.Scene): void {
        this.scene = scene;
        this.map = scene.cache.json.get('characters');
    }

    update(delta: number): void {
        this.duration -= delta;
        if (this.alive && this.duration <= 0) {
            this.alive = false;
            this.sprite.anims.play('mole-miss')
                .once('animationcomplete', () => {
                    EventManager.emit(Events.MOLE_MISS);
                    this.hole.setAvailable();
                    this.sprite.destroy();
                    // this.sprite.anims.destroy();
                });
        }
    }

    attachToHole(hole: Hole): void {
        this.alive = true;
        this.hole = hole;
        const holeCenter = hole.getCenter();
        this.sprite = this.scene.add.sprite(holeCenter.x, holeCenter.y, this.map.key);
        Object.keys(this.map.animations).forEach((animation: string) => this.sprite.anims.load('mole-' + animation));
        this.sprite.anims.play('mole-raise')
            .once('animationcomplete', () => {
                this.sprite.anims.play('mole-alive');
            })
    }

}
