import {GameObject} from "./game-object";
import {Character} from "./characters/character";
import {EventManager, Events} from "../event-manager/event-manager";

export class Hole implements GameObject{
    private readonly holeCenter: Phaser.Math.Vector2;
    private readonly holeDimension: Phaser.Math.Vector2;
    private readonly sensor: Phaser.Geom.Circle;
    private readonly positionInGarden: Phaser.Math.Vector2;
    private readonly scaleRatio: number;
    private character: Character;

    constructor(positionInGarden: Phaser.Math.Vector2, holeCenter: Phaser.Math.Vector2, holeDimension: Phaser.Math.Vector2, scaleRatio: number) {
        this.scaleRatio = scaleRatio;
        this.positionInGarden = positionInGarden;
        this.holeCenter = holeCenter;
        this.holeDimension = holeDimension;
        this.sensor = new Phaser.Geom.Circle(this.holeCenter.x, this.holeCenter.y, this.holeDimension.x/2);
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
        EventManager.emit(Events.HOLE_GOT_SOMETHING, this);
    }

    getCenter() {
        return this.holeCenter;
    }

    setAvailable() {
        this.character = null;
        EventManager.emit(Events.HOLE_AVAILABLE, this);
    }

    checkEmptyHit(position: Phaser.Math.Vector2) {
        if (!this.character && this.sensor.contains(position.x, position.y)) {
            EventManager.emit(Events.HOLE_EMPTY_HIT);
        }
    }

    public getPositionInGarden(): Phaser.Math.Vector2 {
        return this.positionInGarden;
    }

    public killCharacter() {
        if (this.character) {
            this.character.kill();
        }
    }

    destroy() {
        if (this.character) {
            this.character.destroy();
        }
    }

    getScaleRatio() {
        return this.scaleRatio;
    }
}
