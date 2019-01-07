import {GameObject} from "../game-object";
import {LifeBar} from "./life-bar";
import {SpecialBar} from "./special-bar";
import {Time} from "./time";

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

        const time = new Time();
        time.create(scene);

        this.hudList.push(life);
        this.hudList.push(specialBar);
        this.hudList.push(time);
    }

    update(delta: number): void {
        this.hudList.forEach(object => object.update(delta));
    }
}
