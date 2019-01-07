import {Hole} from "../hole";
import {GameObject} from "../game-object";

export interface Character extends GameObject {
    attachToHole(hole: Hole): void;
    kill(): void;
    destroy(): void;
}
