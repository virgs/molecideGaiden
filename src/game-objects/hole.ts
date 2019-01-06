import {GameObject} from "./game-object";
import {Character} from "./characters/character";
import {EventManager, Events} from "../event-manager/event-manager";

export class Hole implements GameObject{
    private readonly holeCenter: Phaser.Math.Vector2;
    private readonly holeDimension: Phaser.Math.Vector2;
    private character: Character;

    constructor(holeCenter: Phaser.Math.Vector2, holeDimension: Phaser.Math.Vector2) {
        this.holeCenter = holeCenter;
        this.holeDimension = holeDimension;
    }

    create(scene: Phaser.Scene): void {

        var sprite = scene.add.sprite(100, 100, 'splash').setScale(.2);

        //  The circle x/y relates to the top-left of the sprite.
        //  So if you want the circle positioned in the middle then you need to offset it by half the sprite width/height:
        var shape = new Phaser.Geom.Circle(this.holeCenter.x, this.holeCenter.y, this.holeDimension.x*3);

        // scene.game.input.mousePointer.on

        sprite.setInteractive(shape, Phaser.Geom.Circle.Contains);

        //  Input Event listeners

        sprite.on('pointerover', function () {
            sprite.setTint(0x7878ff);

        });

        sprite.on('pointerout', function () {

            sprite.clearTint();

        });
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
