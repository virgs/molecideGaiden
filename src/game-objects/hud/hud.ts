import {GameObject} from "../game-object";
import {LifeBar} from "./life-bar";
import {SpecialBar} from "./special-bar";

export class Hud implements GameObject{
    private hudList: GameObject[];

    public constructor() {
        this.hudList = [];
    }

    create(scene: Phaser.Scene): void {
        const life = new LifeBar();
        life.create(scene);

        const specialBar = new SpecialBar();
        specialBar.create(scene);

        this.hudList.push(life);
        this.hudList.push(specialBar);
    }

    update(delta: number): void {
        this.hudList.forEach(object => object.update(delta));
    }
}
