import {Special} from "./special";
import {CharacterCreator} from "../game-objects/characters/character-creator";

export class RabbitCreatorSpecial implements Special {
    private static readonly TOTAL_DURATION: number = 10 * 1000;
    public static instances: number = 0;

    private remainingTime: number;

    public constructor() {
        this.remainingTime = RabbitCreatorSpecial.TOTAL_DURATION;
        if (RabbitCreatorSpecial.instances == 0) {
            CharacterCreator.increaseRabbitProbability();
        }
        ++RabbitCreatorSpecial.instances;
    }


    destroy(): void {
        --RabbitCreatorSpecial.instances;
        if (RabbitCreatorSpecial.instances <= 0) {
            CharacterCreator.decreaseRabbitProbability();
        }
    }

    isOver(): boolean {
        return this.remainingTime <= 0;
    }

    update(delta: number): void {
        this.remainingTime -= delta;
    }
}
