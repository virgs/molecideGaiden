import {EventManager, Events} from "../../event-manager/event-manager";
import {CharacterFactory} from "./character-factory";

export class CharacterCreator {
    private static STAR_PROBABILITY = 0.075;
    private static RABBIT_PROBABILITY = 0.1;

    private nextCreationTimeCounter: number;
    private creationTime: number;
    private duration: number;

    public constructor() {
        this.creationTime = 2000;
        this.nextCreationTimeCounter = this.creationTime;
        this.duration = 1000;

        EventManager.on(Events.INCREASE_RABBIT_PROBABILITY, () => this.increaseRabbitProbability());
        EventManager.on(Events.DECREASE_RABBIT_PROBABILITY, () => this.decreaseRabbitProbability());
        EventManager.on(Events.INCREASE_CREATION_TIME, () => this.increaseCreationTime());
    }

    public update(delta: number) {
        this.nextCreationTimeCounter -= delta;

        if (this.nextCreationTimeCounter <= 0) {
            this.creationTime *= 0.975;
            this.nextCreationTimeCounter = this.creationTime + Math.random() * 100 + 50;
            this.duration *= 0.9;
            this.createCharacter();
        }
    }

    destroy() {
        this.decreaseRabbitProbability();
    }

    private probability(probability: number) {
        return !!probability && Math.random() <= probability;
    };

    private createCharacter(): void {
        const duration = this.duration + Math.random() * 75;
        if (this.probability(CharacterCreator.STAR_PROBABILITY)) {
            EventManager.emit(Events.STAR_CREATED, CharacterFactory.createStar(duration));
        } else if (this.probability(CharacterCreator.RABBIT_PROBABILITY)) {
            EventManager.emit(Events.RABBIT_CREATED, CharacterFactory.createRabbit(duration));
        } else {
            EventManager.emit(Events.MOLE_CREATED, CharacterFactory.createMole(duration));
        }
    }

    private increaseRabbitProbability() {
        CharacterCreator.RABBIT_PROBABILITY = 0.75;
    }

    private decreaseRabbitProbability() {
        CharacterCreator.RABBIT_PROBABILITY = 0.1;
    }

    private increaseCreationTime() {
        this.creationTime = this.creationTime * 1.5 + 500;
    }
}
