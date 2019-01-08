import {EventManager, Events} from "../../event-manager/event-manager";
import {CharacterFactory} from "./character-factory";

export class CharacterCreator {
    private static STAR_PROBABILITY = 0.075;
    private static RABBIT_PROBABILITY = 0.1;

    private nextCreationTimeCounter: number;
    private creationTime: number;
    private duration: number;
    private totalTime: number;

    public constructor() {
        this.creationTime = 2000;
        this.nextCreationTimeCounter = this.creationTime;
        this.duration = 1000;

        this.totalTime = 0;
    }

    public update(delta: number) {
        this.totalTime += delta;
        this.nextCreationTimeCounter -= delta;

        if (this.nextCreationTimeCounter <= 0) {
            this.creationTime *= 0.95;
            this.nextCreationTimeCounter = this.creationTime + Math.random() * 100 + 10;
            console.log(this.nextCreationTimeCounter + "; " + this.totalTime);
            this.duration *= 0.9;
            this.createCharacter();
        }

    }

    private static probability(probability: number) {
        return !!probability && Math.random() <= probability;
    };

    private createCharacter(): void {
        const duration = this.duration + Math.random() * 75;
        if (CharacterCreator.probability(CharacterCreator.STAR_PROBABILITY)) {
            EventManager.emit(Events.STAR_CREATED, CharacterFactory.createStar(duration));
        } else if (CharacterCreator.probability(CharacterCreator.RABBIT_PROBABILITY)) {
            EventManager.emit(Events.RABBIT_CREATED, CharacterFactory.createRabbit(duration));
        } else {
            EventManager.emit(Events.MOLE_CREATED, CharacterFactory.createMole(duration));
        }
    }

    static increaseRabbitProbability() {
        CharacterCreator.RABBIT_PROBABILITY = 0.8;
    }

    static decreaseRabbitProbability() {
        CharacterCreator.RABBIT_PROBABILITY = 0.1;
    }

    destroy() {
        CharacterCreator.decreaseRabbitProbability();
    }
}
