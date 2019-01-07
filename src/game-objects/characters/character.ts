import {Hole} from "../hole";
import {GameObject} from "../game-object";

export interface Character extends GameObject {
    attachToHole(hole: Hole, positionInGarden: Phaser.Math.Vector2): void;
    kill(): void;
    destroy(): void;
}
