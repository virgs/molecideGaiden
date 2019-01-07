import {Special} from "./special";
import {EventManager, Events} from "../event-manager/event-manager";
import {Garden} from "../game-objects/garden";
import {Hole} from "../game-objects/hole";

export class HelicopterKillerSpecial implements Special {
    private static readonly TOTAL_DURATION: number = 10 * 1000;
    private static availableColumns = [0, 1, 2];

    private readonly column: number;
    private sprite: Phaser.GameObjects.Sprite;
    private remainingTime: number;
    private garden: Garden;

    constructor(scene: Phaser.Scene, garden: Garden) {
        this.remainingTime = HelicopterKillerSpecial.TOTAL_DURATION;
        this.garden = garden;

        this.column = HelicopterKillerSpecial.randomizeColumn();
        HelicopterKillerSpecial.availableColumns = HelicopterKillerSpecial.availableColumns.filter(value => value !== this.column);

        this.sprite = scene.add.sprite(10, 10, "helicopter-killer");
        let holeCenter = this.garden.getHoleCenter(this.column, 1);
        this.sprite.setPosition(holeCenter.x, holeCenter.y + 10);
        this.sprite.setDepth(9999999);

        this.sprite.anims.load('helicopter-killer');
        this.sprite.anims.play('helicopter-killer');
        EventManager.on(Events.HOLE_GOT_SOMETHING, (hole: Hole) => this.handleMoleCreation(hole))
    }

    isOver(): boolean {
        return this.remainingTime <= 0;
    }

    update(delta: number): void {
        this.remainingTime -= delta;
    }

    destroy(): void {
        this.sprite.destroy();
        HelicopterKillerSpecial.availableColumns.push(this.column);
    }

    private static randomizeColumn(): number {
        return Math.floor((Math.random() * HelicopterKillerSpecial.availableColumns.length));
    }

    private handleMoleCreation(hole: Hole): void {
        if (!this.isOver() && hole.getPositionInGarden().x === this.column) {
            hole.killCharacter();
        }
    }
}
