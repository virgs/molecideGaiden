import {GameObject} from "./game-object";
import {Character} from "./characters/character";
import {EventManager, Events} from "../event-manager/event-manager";

export class Hole implements GameObject{
    private readonly holeCenter: Phaser.Math.Vector2;
    private character: Character;

    constructor(holeCenter: Phaser.Math.Vector2, holeDimension: Phaser.Math.Vector2) {
        this.holeCenter = holeCenter;
    }

    create(scene: Phaser.Scene): void {
    }

    update(delta: number): void {
        if (this.character) {
            this.character.update(delta);
        }
    }

    insertCharacter(character: Character) {
        this.character = character;
        character.attachToHole(this);
    }

    getCenter() {
        return this.holeCenter;
    }

    setAvailable() {
        this.character = null;
        EventManager.emit(Events.HOLE_AVAILABLE, this);
    }
}
