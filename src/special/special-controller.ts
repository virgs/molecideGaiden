import {EventManager, Events} from "../event-manager/event-manager";
import {Special} from "./special";
import {HelicopterKillerSpecial} from "./helicopter-killer-special";
import {Garden} from "../game-objects/garden";

export class SpecialController {
    private specialCounter: number;
    private specials: Special[];
    private garden: Garden;
    private scene: Phaser.Scene;

    public constructor(scene: Phaser.Scene, garden: Garden) {
        this.garden = garden;
        this.scene = scene;
        this.specialCounter = 0;
        this.specials = [];
        EventManager.on(Events.STAR_HIT, () => this.incrementCounter());
        EventManager.on(Events.SPECIAL_BAR_HIT, () => {
            this.useSpecial();
            this.specialCounter = 0;
            EventManager.emit(Events.STAR_COUNTER_UPDATE, this.specialCounter);
        });
    }

    private incrementCounter(): void {
        ++this.specialCounter;

        if (this.specialCounter >= 4) {
            this.specialCounter = 4;
        }
        EventManager.emit(Events.STAR_COUNTER_UPDATE, this.specialCounter);
    }

    private useSpecial() {
        EventManager.emit(Events.KILL_EVERY_CHARACTER);
        switch (this.specialCounter) {
            case 1:
                this.specials.push(new HelicopterKillerSpecial(this.scene, this.garden));
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
    }

    update(delta: number) {
        const indexToRemove = [];
        this.specials.forEach((special, index) => {
            special.update(delta);
            if (special.isOver()) {
                special.destroy();
                indexToRemove.push(index);
            }
        });

        indexToRemove.forEach((index) => this.specials.splice(index, 1))
    }
}
