import {Character} from "./character";
import {Hole} from "../hole";
import {EventManager, Events} from "../../event-manager/event-manager";

export type CharacterPrototypeConfig = {
    name: string;
    events: {
        miss: Events,
        hit: Events
    }
}

export class CharacterPrototype implements Character {
    private duration: number;
    private sprite: Phaser.GameObjects.Sprite;
    private map: any;
    private scene: Phaser.Scene;
    private hole: Hole;
    private alive = false;
    private startMissing = false;
    private characterConfig: CharacterPrototypeConfig;
    private positionInGarden: Phaser.Math.Vector2;

    constructor(characterConfig: CharacterPrototypeConfig, duration: number) {
        this.characterConfig = characterConfig;
        this.duration = duration;
    }

    create(scene: Phaser.Scene): void {
        this.scene = scene;
        this.map = scene.cache.json.get('characters');
        EventManager.on(Events.KILL_EVERY_CHARACTER, () => this.kill());
    }

    update(delta: number): void {
        this.duration -= delta;
        if (this.alive && this.duration <= 0 && !this.startMissing) {
            this.startMissing = true;
            if (this.sprite) {
                this.sprite.anims.play(`${this.characterConfig.name}-miss`)
                    .once('animationcomplete', () => {
                        if (this.alive) {
                            EventManager.emit(this.characterConfig.events.miss);
                            this.alive = false;
                            this.hole.setAvailable();
                            this.destroy();
                        }
                    });
            }
        }
    }

    attachToHole(hole: Hole): void {
        this.positionInGarden = hole.getPositionInGarden();
        this.alive = true;
        this.hole = hole;
        const holeCenter = hole.getCenter();
        this.sprite = this.scene.add.sprite(holeCenter.x, holeCenter.y, this.map.key).setInteractive();
        const scaleRatio = hole.getScaleRatio();
        this.sprite.setScale(scaleRatio, scaleRatio);

        this.sprite.on('pointerdown', () => this.kill());

        Object.keys(this.map.animations).forEach((animation: string) => this.sprite.anims.load('mole-' + animation));
        this.sprite.anims.play(`${this.characterConfig.name}-raise`)
            .once('animationcomplete', () => {
                this.sprite.anims.play(`${this.characterConfig.name}-alive`);
            })
    }

    public kill(): void {
        if (this.alive) {
            this.alive = false;
            EventManager.emit(this.characterConfig.events.hit);
            if (this.sprite) {
                this.sprite.anims.play(`${this.characterConfig.name}-hit`)
                    .once('animationcomplete', () => {
                        this.hole.setAvailable();
                        this.destroy();
                    });
            }
        }
    }

    destroy(): void {
        if (this.sprite) {
            this.sprite.destroy();
            this.sprite = null;
        }
    }
}

