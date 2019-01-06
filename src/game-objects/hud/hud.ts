import {GameObject} from "../game-object";
import {LifeBar} from "./life-bar";

export class Hud implements GameObject{
    private hudList: GameObject[];

    public constructor() {
        this.hudList = [];
    }

    create(scene: Phaser.Scene): void {
        const life = new LifeBar();
        life.create(scene);

        this.hudList.push(life)
    }

    update(delta: number): void {
        this.hudList.forEach(object => object.update(delta));
    }
}
