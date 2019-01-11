import {EventManager, Events} from "../event-manager/event-manager";
import {Special} from "./special";
import {HelicopterKillerSpecial} from "./helicopter-killer-special";
import {Garden} from "../game-objects/garden";
import {RabbitCreatorSpecial} from "./rabbit-creator-special";
import {ScoreFullSpecial} from "./score-full-special";
import {IncreaseCreationTimeSpecial} from "./increase-creation-time-special";

export class SpecialController {
    private readonly garden: Garden;
    private readonly scene: Phaser.Scene;
    private specialCounter: number;
    private specials: Special[];

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
                this.specials.push(new ScoreFullSpecial());
                break;
            case 2:
                this.specials.push(new HelicopterKillerSpecial(this.scene, this.garden));
                break;
            case 3:
                this.specials.push(new IncreaseCreationTimeSpecial());
                break;
            case 4:
                this.specials.push(new RabbitCreatorSpecial());
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

    destroy() {
        this.specials.forEach(special => special.destroy());
    }
}
