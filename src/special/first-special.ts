import {Special} from "./special";
import {EventManager, Events} from "../event-manager/event-manager";
import {Garden} from "../game-objects/garden";
import {Hole} from "../game-objects/hole";

export class FirstSpecial implements Special {
    private static readonly TOTAL_DURATION: number = 10 * 1000;
    private static readonly availableColumns = [0, 1, 2];

    private readonly column: number;
    private sprite: Phaser.GameObjects.Sprite;
    private remainingTime: number;
    private garden: Garden;

    constructor(scene: Phaser.Scene, garden: Garden) {
        EventManager.emit(Events.KILL_EVERY_CHARACTER);
        this.remainingTime = FirstSpecial.TOTAL_DURATION;
        this.garden = garden;

        this.column = FirstSpecial.randomizeColumn();
        console.log('Creating first special at: ' + this.column);
        FirstSpecial.availableColumns.splice(this.column, 1);

        this.sprite = scene.add.sprite(10, 10, "helicopter-killer");
        let holeCenter = this.garden.getHoleCenter(this.column, 1);
        this.sprite.setPosition(holeCenter.x, holeCenter.y + 10);

        this.sprite.anims.load('helicopter-killer');
        this.sprite.anims.play('helicopter-killer');
        EventManager.on(Events.HOLE_GOT_MOLE, (hole: Hole) => this.handleMoleCreation(hole))
    }

    isOver(): boolean {
        return this.remainingTime <= 0;
    }

    update(delta: number): void {
        this.sprite.setDepth(9999999);
        this.remainingTime -= delta;
    }

    destroy(): void {
        this.sprite.destroy();
        FirstSpecial.availableColumns.push(this.column);
    }

    private static randomizeColumn(): number {
        return Math.floor((Math.random() * FirstSpecial.availableColumns.length));
    }

    private handleMoleCreation(hole: Hole) {
        if (!this.isOver() && hole.getPositionInGarden().x === this.column) {
            hole.killCharacter();
        }
    }
}
